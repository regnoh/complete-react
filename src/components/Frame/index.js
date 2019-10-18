import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";
import { adminRoutes } from "../../routes";
import logo from "./logo.png";
import "./index.less";
import { withRouter } from "react-router-dom";
const { Header, Content, Sider } = Layout;
// 在线制作logo: http://www.uugai.com/
// antd - layout - less修改样式
const Frame = ({ children, location }) => {
  const navRoutes = adminRoutes.filter(r => r.isNav);
  let selectedKeys = location.pathname.split("/");
  selectedKeys = selectedKeys.slice(0, 3).join("/");
  // console.log("TCL: Frame -> selectedKeys", selectedKeys);
  // console.log(location.pathname);
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
            selectedKeys={[selectedKeys]} // 当前选中菜单项，实时变化 /admin->/admin/dashboard
            // defaultSelectedKeys={[location.pathname]} // 初始选中菜单项， 但是输入/admin时，初始没选中
            // defaultSelectedKeys={[navRoutes[0].path]} // 写死。刷新时当前都是dashboard
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
export default withRouter(Frame);
