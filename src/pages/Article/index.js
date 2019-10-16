import React from "react";
import { Card, Button, Table } from "antd";
const dataSource = []; // 配置国际化后 no data -> 暂无数据

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
