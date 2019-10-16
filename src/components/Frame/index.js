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
    <Layout className="yf-frame">
      <Header className="header yf-header">
        <div className="logo yf-logo">
          <img src={logo} alt="yf" />
        </div>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: "#fff" }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={[navRoutes[0].path]}
            // defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            {navRoutes.map(({ path, icon, title }) => (
              <Menu.Item key={path}>
                <Link to={path}>
                  <Icon type={icon} />
                  <span>{title}</span>
                </Link>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
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
