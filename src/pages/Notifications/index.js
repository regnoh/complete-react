import React from "react";
import { Card, Button, List, Avatar, Badge } from "antd";

const Notifications = () => {
  const listData = [];
  for (let i = 0; i < 23; i++) {
    listData.push({
      href: "http://ant.design",
      title: `ant design part ${i}`,
      avatar:
        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      description:
        "Ant Design, a design language for background applications, is refined by Ant UED Team.",
      content:
        "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently."
    });
  }
  return (
    <Card
      title="通知中心"
      bordered={false}
      extra={<Button>全部标记为已读</Button>}
    >
      <List
        dataSource={listData}
        renderItem={item => (
          <List.Item key={item.title} extra={<Button>标记为已读</Button>}>
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<Badge dot>{item.title}</Badge>}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default Notifications;
