import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Icon, Dropdown, Avatar, Badge } from "antd";
import { connect } from "react-redux";
import { adminRoutes } from "../../routes";
import logo from "./logo.png";
import "./index.less";
import { withRouter } from "react-router-dom";
import { getNotifications } from "../../actions/notifications";
import { logout } from "../../actions/user";

const { Header, Content, Sider } = Layout;
// 在线制作logo: http://www.uugai.com/
// antd - layout - less修改样式

const Frame = props => {
  const {
    children,
    location,
    unReadCount,
    getNotifications,
    user,
    logout
  } = props;
  useEffect(() => {
    // 实际项目应该由后端推送通知信息，这里模拟10min获取1次数据
    getNotifications();
    setInterval(() => {
      getNotifications();
    }, 600000);
  }, []);
  const navRoutes = adminRoutes.filter(r => r.isNav);
  let selectedKeys = location.pathname.split("/");
  selectedKeys = selectedKeys.slice(0, 3).join("/");

  const renderMenu = () => {
    return (
      <Menu style={{ textAlign: "center" }}>
        <Menu.Item>
          <Badge dot={unReadCount > 0}>
            <Link to="/admin/notifications">通知中心</Link>
          </Badge>
        </Menu.Item>
        <Menu.Item>
          <Link to="/admin/profile">个人中心</Link>
        </Menu.Item>

        <Menu.Item onClick={logout}>退出登录</Menu.Item>
      </Menu>
    );
  };
  return (
    <Layout className="yf-frame">
      <Header className="header yf-header">
        <div className="logo yf-logo">
          <img src={logo} alt="yf" />
        </div>
        <div>
          <Dropdown overlay={renderMenu()}>
            <Badge count={unReadCount} overflowCount={99}>
              <Avatar src={user.avatar} />
              <span style={{ marginLeft: 5 }}>欢迎！{user.nickname} </span>
              <Icon type="down" />
            </Badge>
          </Dropdown>
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
const mapStateToProps = state => {
  const list = state.getIn(["notifications", "list"]);
  return {
    user: state.getIn(["user", "user"]),
    unReadCount: list.filter(item => !item.hasRead).length
  };
};
// const mapStateToProps = ({ notifications, user }) => ({
//   unReadCount: notifications.list.filter(item => !item.hasRead).length,
//   user: user.user
// });

export default connect(
  mapStateToProps,
  { getNotifications, logout }
)(withRouter(Frame));
