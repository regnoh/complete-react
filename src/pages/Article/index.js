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
]; // 配置国际化后 no data -> 暂无数据

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
  },
  {
    title: "操作",
    dataIndex: "action",
    key: "action",
    render: (text, record, index) => {
      // console.log("renderProps: ", { text, record, index });
      return <Button>编辑</Button>;
    }
  }
];
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: record => ({
    // disabled: record.name === "Disabled User", // Column configuration not to be checked
    name: record.name
  })
};
const ArticleList = () => {
  return (
    <Card
      title="文章列表"
      extra={<Button>导出为excel</Button>}
      bordered={false}
    >
      <Table
        // loading={true}
        dataSource={dataSource}
        columns={columns}
        rowSelection={rowSelection}
        pagination={{
          total: 20,
          pageSize: 10
        }}
      />
    </Card>
  );
};

export default ArticleList;
