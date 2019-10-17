import React, { useEffect, useState } from "react";
import { Card, Button, Table, Tag } from "antd";
import dayjs from "dayjs";
// import moment from "moment";// 235.4k
import { fetchArticles } from "../../services/articles";
import ButtonGroup from "antd/lib/button/button-group";
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
    title: "标题",
    author: "作者",
    createAt: "时间",
    amount: "阅读量"
  };
  const getColumTitle = key => {
    // 根据某种类别进行条件渲染, 可独立定义map
    return ARTICLE_COLUMN_ZH_MAP[key];
  };
  const getColumns = list => {
    const keys = Object.keys(list[0]).filter(key => key !== "id");
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
      }),
      {
        title: "操作",
        dataIndex: "action",
        key: "action",
        render: (text, record, index) => {
          return (
            <ButtonGroup>
              <Button size="small" type="primary">
                编辑
              </Button>
              <Button size="small" type="danger">
                删除
              </Button>
            </ButtonGroup>
          );
        }
      }
    ];
    return columns;
  };
  const getDataSource = list => {
    return list.map(item => ({
      key: item.id,
      ...item,
      createAt: dayjs(item.createAt).format("YYYY-MM-DD")
      // createAt: new Date(item.createAt).getFullYear()
    }));
  };
  const onPageChange = (page, pageSize) => {
    // console.log("ArticleList -> page, pageSize", page, pageSize);
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
      extra={<Button>导出为excel</Button>}
      bordered={false}
    >
      <Table
        // rowKey={record => record.id}
        loading={loading}
        dataSource={dataSource}
        columns={columns}
        pagination={{
          total,
          current: offset / limited + 1,
          pageSize: limited,
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
