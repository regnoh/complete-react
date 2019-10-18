import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, Form, Input } from "antd";
const Edit = () => {
  // const toBack = () => {};
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 }
    }
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0
      },
      sm: {
        span: 16,
        offset: 4
      }
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
  };
  return (
    <Card
      title="编辑文章"
      extra={
        <Button>
          <Link to="/admin/articles">返回</Link>
        </Button>
      }
      bordered={false}
    >
      <Form {...formItemLayout} onSubmit={handleSubmit}>
        <Form.Item label="标题">
          <Input placeholder="标题" />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            保存修改
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Edit;
