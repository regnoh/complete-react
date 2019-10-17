import React, { useEffect, useState } from "react";
import { Card, Button, Table } from "antd";
import { fetchArticles } from "../../services/articles";
const ArticleList = () => {
  const [dataSource, setDataSource] = useState([]);
  const [columns, setColumns] = useState([]);
  const [total, setTotal] = useState(0);
  const getColumns = list => {
    const keys = Object.keys(list[0]).filter(key => key !== "id");
    const columns = [
      ...keys.map(key => ({
        title: key,
        name: key,
        dataIndex: key
      })),
      {
        title: "action",
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
    return list.map(({ id, title, author, createAt, amount }) => ({
      key: id,
      title,
      author,
      createAt: new Date(createAt).getFullYear(),
      amount
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
