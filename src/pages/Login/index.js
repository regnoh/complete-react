import React from "react";
import { Card, Form, Input, Icon, Checkbox, Button, Row, Col } from "antd";
const Login = ({ form }) => {
  const { getFieldDecorator } = form;
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 }
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
        offset: 6
      }
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log("TCL: handleSubmit -> values", values);
      }
    });
  };
  return (
    <Row type="flex" justify="center" align="middle" style={{ height: "100%" }}>
      <Col span={8}>
        <Card title="YF-登录" bordered={false}>
          <Form onSubmit={handleSubmit} {...formItemLayout}>
            <Form.Item label="用户名">
              {getFieldDecorator("username", {
                rules: [{ required: true, message: "请输入用户名" }]
              })(
                <Input
                  placeholder="admin"
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                />
              )}
            </Form.Item>
            <Form.Item label="密码">
              {getFieldDecorator("password", {
                rules: [{ required: true, message: "请输入密码" }]
              })(
                <Input
                  placeholder="yf1234"
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                />
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              {getFieldDecorator("remember", {
                valuePropName: "checked",
                initialValue: true
              })(<Checkbox>Remember me</Checkbox>)}
              <Button type="primary" htmlType="submit">
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Form.create()(Login);
