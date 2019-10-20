import React from "react";
import { Card, Form, Input, Button, Spin } from "antd";
import { connect } from "react-redux";
import { UploadImg } from "../../components";
import { editUser } from "../../actions/user";
import { formItemLayout, tailFormItemLayout } from "../Login";
const Profile = ({ form, user, isLoading, editUser }) => {
  const { getFieldDecorator } = form;
  const onImgChange = imgUrl => {
    // console.log("TCL: Profile -> imgUrl", imgUrl);
    form.setFieldsValue({ avatar: imgUrl });
  };
  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log("TCL: Profile -> values", values);
        editUser(user.id, values);
      }
    });
  };
  return (
    <Card title="个人中心" bordered={false}>
      <Spin spinning={isLoading}>
        <Form onSubmit={handleSubmit} {...formItemLayout}>
          <Form.Item label="头像">
            {getFieldDecorator("avatar", {
              initialValue: user.avatar
            })(
              <UploadImg
                onImgChange={onImgChange}
                defaultImg={user.avatar}
                // defaultImg="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            )}
          </Form.Item>
          <Form.Item label="昵称">
            {getFieldDecorator("nickname", {
              initialValue: user.nickname,
              rules: [{ required: true, message: "请输入昵称" }]
            })(<Input />)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" block>
              提交修改
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </Card>
  );
};
const mapStateToProps = ({ user }) => ({
  user: user.user,
  isLoading: user.isLoading
});

export default connect(
  mapStateToProps,
  { editUser }
)(Form.create()(Profile));
