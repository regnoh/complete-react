import React from "react";
import { Card, Button, List, Avatar, Badge, Spin } from "antd";
import { connect } from "react-redux";
import { markAllAsRead, markAsRead } from "../../actions/notifications";
const Notifications = ({
  list,
  isLoading,
  unReadCount,
  markAllAsRead,
  markAsRead
}) => {
  return (
    <Card
      title="通知中心"
      bordered={false}
      extra={
        <Button onClick={markAllAsRead} disabled={!unReadCount}>
          全部标记为已读
        </Button>
      }
    >
      <Spin spinning={isLoading}>
        <List
          dataSource={list}
          renderItem={item => (
            <List.Item
              key={item.id}
              extra={
                !item.hasRead && (
                  <Button onClick={() => markAsRead(item.id)}>
                    标记为已读
                  </Button>
                )
              }
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<Badge dot={!item.hasRead}>{item.title}</Badge>}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </Spin>
    </Card>
  );
};
const mapStateToProps = state => {
  const list = state.getIn(["notifications", "list"]);
  const isLoading = state.getIn(["notifications", "isLoading"]);
  return {
    list,
    isLoading,
    unReadCount: list.filter(item => !item.hasRead).length
  };
};

export default connect(
  mapStateToProps,
  { markAllAsRead, markAsRead }
)(Notifications);
