import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  Button,
  Form,
  Input,
  DatePicker,
  InputNumber,
  message,
  Spin
} from "antd";
import E from "wangeditor";
import moment from "moment";
import { fetchArticle, updateArticle, createArticle } from "../../../services";
import "./index.less";
const ArticleForm = props => {
  const { form, match, history } = props;
  const { getFieldDecorator } = form;
  const [spinning, setSpinning] = useState(false);
  const { id } = match.params;
  const isEdit = !!id;
  const contentRef = useRef(null);
  useEffect(() => {
    // initEditor
    const editor = new E(contentRef.current); // 指定挂载editor的dom
    editor.customConfig.onchange = html => {
      form.setFieldsValue({
        content: html
      });
    };
    editor.create();
    const initValues = () => {
      setSpinning(true);
      fetchArticle(id)
        .then(res => {
          form.setFieldsValue({
            title: res.title,
            author: res.author,
            amount: res.amount,
            content: res.content,
            createAt: moment(res.createAt) // 接口返回timeStamp -> Moment: DatePicker产生、接收的数据类型需为Moment
          });
          editor.txt.html(res.content); // 编辑器初始值
        })
        .finally(() => setSpinning(false));
    };
    // initValues
    isEdit && initValues();
  }, []);
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
        setSpinning(true);
        if (isEdit) {
          updateArticle(id, {
            ...values,
            createAt: values["createAt"].valueOf()
          })
            .then(res => {
              // message.success(res.msg);
              history.goBack();
            })
            .finally(() => {
              setSpinning(false);
            });
        } else {
          createArticle(values)
            .then(res => {
              message.success("创建成功" + res.id);
              history.goBack();
            })
            .finally(() => {
              setSpinning(false);
            });
        }
      }
    });
  };
  return (
    <Card
      title={isEdit ? "编辑文章" : "创建文章"}
      extra={<Button onClick={() => history.goBack()}>返回</Button>}
      bordered={false}
    >
      <Spin spinning={spinning}>
        <Form {...formItemLayout} onSubmit={handleSubmit}>
          <Form.Item label="标题">
            {getFieldDecorator("title", {
              rules: [
                { required: true, message: "请输入文章标题!" },
                { min: 2, message: "最少2位!" },
                { max: 20, message: "最多20位!" }
              ]
            })(<Input placeholder="标题" />)}
          </Form.Item>
          <Form.Item label="作者">
            {getFieldDecorator("author", {
              rules: [{ required: true, message: "请输入文章作者!" }]
            })(<Input placeholder="Mike" />)}
          </Form.Item>
          {isEdit &&
            ((
              <Form.Item label="阅读量">
                {getFieldDecorator("amount", {
                  rules: [{ required: true, message: "请输入文章阅读量!" }]
                })(<InputNumber min={0} />)}
                <span className="ant-form-text"> 次</span>
              </Form.Item>
            ),
            (
              <Form.Item label="发布时间">
                {getFieldDecorator("createAt", {
                  // initialValue: moment(new Date()),
                  rules: [
                    {
                      type: "object",
                      required: true,
                      message: "请选择发布时间!"
                    }
                  ]
                })(<DatePicker showTime />)}
              </Form.Item>
            ))}
          <Form.Item label="内容">
            {getFieldDecorator("content", {
              rules: [
                {
                  required: true,
                  message: "请填写内容!"
                }
              ]
            })(<div ref={contentRef} className="qf-editor" />)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              {isEdit ? "保存修改" : "提交"}
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </Card>
  );
};
export default Form.create({})(ArticleForm);
