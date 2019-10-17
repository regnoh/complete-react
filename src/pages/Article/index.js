import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Table,
  Tag,
  Popconfirm,
  Typography,
  message
} from "antd";
import dayjs from "dayjs";
// import moment from "moment";// 235.4k
import XLSX from "xlsx";
import { fetchArticles, deleteArticle } from "../../services/articles";
import ButtonGroup from "antd/lib/button/button-group";
const { Title, Text } = Typography;
// 将dayjs挂载到window上，便于在浏览器console直接使用dayjs
// window.dayjs = dayjs;
const ArticleList = () => {
  const [dataSource, setDataSource] = useState([]);
  const [columns, setColumns] = useState([]);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [limited, setLimited] = useState(10);
  const [loading, setLoading] = useState(false);
  const ARTICLE_COLUMN_ZH_MAP = {
    id: "id",
    title: "标题",
    author: "作者",
    createAt: "时间",
    amount: "阅读量"
  };
  const getColumTitle = key => {
    // 根据某种类别进行条件渲染, 可独立定义map
    return ARTICLE_COLUMN_ZH_MAP[key];
  };
  const getDataColumns = list => {
    const keys = Object.keys(list[0]);
    const columns = [
      ...keys.map(key => {
        if (key === "amount") {
          return {
            title: getColumTitle(key),
            name: key,
            dataIndex: key,
            render: (text, record) => {
              // 根据阅读量大小进行条件渲染
              const color = record.amount > 400 ? "red" : "green";
              return <Tag color={color}>{record.amount}</Tag>;
            }
          };
        } else {
          return {
            title: getColumTitle(key),
            name: key,
            dataIndex: key
          };
        }
      })
    ];
    return columns;
  };
  const getActionColumn = () => {
    return {
      title: "操作",
      dataIndex: "action",
      key: "action",
      render: (text, record, index) => {
        return (
          <ButtonGroup>
            <Button size="small" type="primary">
              编辑
            </Button>
            <Popconfirm
              title={
                <div>
                  <Title level={4}>此操作不可逆，请慎重！！！</Title>
                  <Text>
                    确定要删除文章《
                    <span style={{ color: "red" }}>{record.title}》</span>吗？
                  </Text>
                </div>
              }
              okText="删除"
              cancelText="取消"
              onConfirm={() => handleDelete(record.id)}
            >
              <Button size="small" type="danger">
                删除
              </Button>
            </Popconfirm>
          </ButtonGroup>
        );
      }
    };
  };
  // 确认删除
  const handleDelete = id => {
    deleteArticle(id)
      .then(res => message.success(res.msg))
      .catch(err => {});
  };
  const getColumns = list => {
    return [...getDataColumns(list), getActionColumn()];
  };
  const getDataSource = list => {
    return list.map(item => ({
      // key: item.id,
      ...item,
      createAt: dayjs(item.createAt).format("YYYY-MM-DD")
      // createAt: new Date(item.createAt).getFullYear()
    }));
  };
  const onPageChange = (page, pageSize) => {
    // console.log("ArticleList -> page, pageSize", page, pageSize);
    setLimited(pageSize);
    setOffset((page - 1) * pageSize);
  };
  const onPageSizeChange = (current, size) => {
    // console.log("onPageSizeChange -> current, size", current, size);
    setLimited(size);
    // 重回首页
    setOffset(0);
    // 刷新当前页
    // setOffset((current - 1) * size);
  };
  // xlsx react demo : https://github.com/SheetJS/js-xlsx/blob/b0d18ed6dbedaeb83fc9c79edfd564a6d6adcc6d/demos/react/sheetjs.jsx
  const exportFile = (data, filename) => {
    /* convert state to workbook */

    const ws = XLSX.utils.aoa_to_sheet(data);

    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");

    /* generate XLSX file and send to client */

    XLSX.writeFile(wb, filename);
  };
  const formatData = () => {
    const titles = Object.keys(dataSource[0]);
    // console.log("TCL: formatData -> titles", titles);
    const rowValues = dataSource.map(row => Object.values(row));
    const data = [titles, ...rowValues];
    // console.log("TCL: formatData -> data", data);
    return data;
  };
  const onToExcel = () => {
    // 实际项目中，是由前端发送ajax请求，由后端返回一个文件下载地址
    // 这里用xlsx包来测试前端表格下载
    const data = formatData();
    // 文件名
    const filename = `yf-articles-${offset / limited + 1}-${dayjs().format(
      "YYYYMMDDhhmmss"
    )}.xlsx`;
    exportFile(data, filename);
  };
  // TODO: 每次请求获得的数据都固定为10个，如何根据传入的limited修改
  useEffect(() => {
    setLoading(true);
    fetchArticles(offset, limited)
      .then(res => {
        // console.log("res ", res);
        setTotal(res.total);
        setDataSource(getDataSource(res.list));
        setColumns(getColumns(res.list));
      })
      .catch(err => {}) // services/articles.js全局处理过了
      .finally(() => {
        setLoading(false);
      });
  }, [offset]);
  return (
    <Card
      title="文章列表"
      extra={<Button onClick={onToExcel}>导出为excel</Button>}
      bordered={false}
    >
      <Table
        rowKey={record => record.id}
        loading={loading}
        dataSource={dataSource}
        columns={columns}
        pagination={{
          total,
          current: offset / limited + 1,
          // pageSize: limited,
          hideOnSinglePage: true,
          showQuickJumper: true,
          showSizeChanger: true,
          onChange: onPageChange,
          onShowSizeChange: onPageSizeChange
        }}
      />
    </Card>
  );
};

export default ArticleList;
