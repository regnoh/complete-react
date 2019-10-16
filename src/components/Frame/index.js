import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import { adminRoutes } from "../../routes";
import logo from "./logo.png";
import "./index.less";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
// 在线制作logo: http://www.uugai.com/
// antd - layout - less修改样式
const Frame = ({ children }) => {
  const navRoutes = adminRoutes.filter(r => r.isNav);
  return (
    <Layout>
      <Header className="header yf-header">
        <div className="logo yf-logo">
          <img src={logo} alt="yf" />
        </div>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: "#fff" }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={[""]}
            // defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            {navRoutes.map(({ path, title, isNav }, index) => (
              <Menu.Item>
                <Link key={index} to={path}>
                  {title}
                </Link>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              background: "#fff",
              padding: 24,
              margin: 0,
              minHeight: 280
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default Frame;
