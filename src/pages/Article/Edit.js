import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, Form, Input, DatePicker, InputNumber } from "antd";
import moment from "moment";
const Edit = ({ form }) => {
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
    form.validateFields((err, values) => {
      if (!err) {
        // console.log("Received values of form: ", values); // {title："哈哈", author: "刘阿达", createAt: Moment}
        const formatedValues = {
          ...values,
          createAt: values["createAt"].valueOf() // Moment -> 1571362043744
          // createAt: values["createAt"].format("YYYY-MM-DD HH:mm:ss") // Moment -> 2019-01-10 09:28:57
        };
        console.log("Formated values of form: ", formatedValues);
      }
    });
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
          {form.getFieldDecorator("title", {
            initialValue: "《父母》",
            rules: [
              { required: true, message: "请输入文章标题!" },
              { min: 2, message: "最少2位!" },
              { max: 20, message: "最多20位!" }
            ]
          })(<Input placeholder="标题" />)}
        </Form.Item>
        <Form.Item label="作者">
          {form.getFieldDecorator("author", {
            initialValue: "麦克",
            rules: [{ required: true, message: "请输入文章作者!" }]
          })(<Input placeholder="Mike" />)}
        </Form.Item>
        <Form.Item label="阅读量">
          {form.getFieldDecorator("amount", {
            initialValue: 0,
            rules: [{ required: true, message: "请输入文章阅读量!" }]
          })(<InputNumber min={0} />)}
          <span className="ant-form-text"> 次</span>
        </Form.Item>
        <Form.Item label="发布时间">
          {form.getFieldDecorator("createAt", {
            initialValue: moment(new Date()),
            rules: [
              {
                type: "object",
                required: true,
                message: "请选择发布时间!"
              }
            ]
          })(<DatePicker showTime />)}
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
// export default Edit;
// 获取props.form
export default Form.create({})(Edit);
