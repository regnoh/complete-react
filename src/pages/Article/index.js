import React from "react";
import { Card, Button, Table } from "antd";
const dataSource = [
  {
    key: "1",
    name: "胡彦斌",
    age: 32,
    address: "西湖区湖底公园1号"
  },
  {
    key: "2",
    name: "胡彦祖",
    age: 42,
    address: "西湖区湖底公园1号"
  }
];

const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "年龄",
    dataIndex: "age",
    key: "age"
  },
  {
    title: "住址",
    dataIndex: "address",
    key: "address"
  }
];

const ArticleList = () => {
  return (
    <Card
      title="文章列表"
      extra={<Button>导出为excel</Button>}
      bordered={false}
    >
      <Table dataSource={dataSource} columns={columns} />
    </Card>
  );
};

export default ArticleList;
