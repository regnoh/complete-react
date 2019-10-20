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
import moment from "moment";
import E from "wangeditor";
import { fetchArticle, updateArticle } from "../../services";
import "./edit.less";
const Edit = props => {
  const { form, match, history } = props;
  const { getFieldDecorator } = form;
  const [spinning, setSpinning] = useState(false);
  const contentRef = useRef(null);
  useEffect(() => {
    // console.log(props);
    // console.log("wangEditor", E);
    // console.log("contentRef", contentRef);
    setSpinning(true);
    fetchArticle(match.params.id)
      .then(res => {
        initEditor(res.content);
        form.setFieldsValue({
          // ...res, // Warning: You cannot set a form field before rendering a field associated with the value.
          title: res.title, // 修复上述问题，因为res中有id等，不在formField中
          author: res.author,
          amount: res.amount,
          createAt: moment(res.createAt) // 接口返回timeStamp -> Moment: DatePicker产生、接收的数据类型需为Moment
        });
      })
      .finally(() => setSpinning(false));
  }, []);
  // wangeditor3富文本编辑器开发文档： https://www.kancloud.cn/wangfupeng/wangeditor3/332599
  const initEditor = editorContent => {
    const editor = new E(contentRef.current); // 指定挂载editor的dom
    editor.create();
    editor.customConfig.onchange = html => {
      // console.log("TCL: html", html);
      // 监控变化，同步更新
      form.setFieldsValue({
        content: html
      });
    };
    editor.txt.html(editorContent); // 初始值
  };
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
          createAt: values["createAt"].valueOf() // Moment -> timestamp, DatePicker产生的数据需要转化为timeStamp,再给后端接口
          // createAt: values["createAt"].format("YYYY-MM-DD HH:mm:ss") // Moment -> 2019-01-10 09:28:57
        };
        // console.log("Formated values of form: ", formatedValues);
        setSpinning(true);
        updateArticle(match.params.id, formatedValues)
          .then(res => {
            message.success(res.msg);
            history.goBack();
          })
          .finally(() => {
            setSpinning(false);
          });
      }
    });
  };
  return (
    <Card
      title="编辑文章"
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
          <Form.Item label="阅读量">
            {getFieldDecorator("amount", {
              rules: [{ required: true, message: "请输入文章阅读量!" }]
            })(<InputNumber min={0} />)}
            <span className="ant-form-text"> 次</span>
          </Form.Item>
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
          <Form.Item label="内容">
            {getFieldDecorator("content", {
              rules: [
                {
                  required: true,
                  message: "请填写内容!"
                }
              ]
            })(<div className="qf-editor" ref={contentRef} />)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              保存修改
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </Card>
  );
};
// export default Edit;
// 获取props.form
export default Form.create({})(Edit);
