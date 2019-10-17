import React, { useEffect, useState } from "react";
import { Card, Button, Table, Tag } from "antd";
import { fetchArticles } from "../../services/articles";
const ArticleList = () => {
  const [dataSource, setDataSource] = useState([]);
  const [columns, setColumns] = useState([]);
  const [total, setTotal] = useState(0);
  const ARTICLE_COLUMN_ZH_MAP = {
    title: "标题",
    author: "作者",
    createAt: "时间",
    amount: "阅读量",
    action: "操作"
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
          return <Button>编辑</Button>;
        }
      }
    ];
    return columns;
  };
  const getDataSource = list => {
    return list.map(item => ({
      key: item.id,
      ...item,
      createAt: new Date(item.createAt).getFullYear()
    }));
  };

  useEffect(() => {
    fetchArticles().then(res => {
      // console.log("res ", res);
      setTotal(res.total);
      setDataSource(getDataSource(res.list));
      setColumns(getColumns(res.list));
    });
  }, []);
  return (
    <Card
      title="文章列表"
      extra={<Button>导出为excel</Button>}
      bordered={false}
    >
      <Table
        // rowKey={record => record.id}
        loading={dataSource.length === 0}
        dataSource={dataSource}
        columns={columns}
        pagination={{
          total,
          hideOnSinglePage: true
        }}
      />
    </Card>
  );
};

export default ArticleList;
