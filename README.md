### 1. 脚手架cra
### 2. antd(cra配置：@decorate，按需加载，主题, 国际化；常用组件)
### 3. 基本路由配置（Router Switch Route)
### 4. 懒加载react-loadable
```js
import Loadable from "react-loadable";
import { Loading } from "../components";
const Login = Loadable({
  loader: () => import("./Login"),
  loading: Loading
});
```
### 5. 组件开发
#### (1) 布局<Layout>
1. (commons：header,nav）（pages：content）
2. 顶部：在线logo设计网站
3. 侧边导航栏：antd<Menu <Menu.Item（当前选中栏高亮...)
4. 图标: iconfont或antd <Icon
#### (2) 表格<Table
1. 格式化数据-> dataSource，column
2. 当前行
3. 分页(pagination属性, 接口offset,limited)
4. xlsx将表格数据导出为excel(实际项目应由后端返回excel）
### 6. 登录
#### (1) 表单<Form
1. Form.create()->this.props.form->getFieldDecorator...
2. 初始值(initialValues)
3. 验证(rules, getFieldDecorator())
4. 提交(err,values,setFieldValues({}))
5. [注]自定义表单项：
  eg:富文本编辑器(wangEditor), 与自带表单项<Input>等相比，
  不同: 1. 一般还要用ref指定dom, 
        2. 需要手动调用方法监听内容的更改，然后setFieldValues()保存为form里的值(getFieldsValues才可取到并自动验证)
        3. 设置初始值，不用initialValues，得自己往editor里设值
  总结： antd的<Form <Input已经封装好了数据绑定，而自定义表单项需要手动进行双向数据绑定
  
#### (2) 接口
1. service->actionCreator->reducer->store->comp
2. 在rap2.taobao.com中创建登录接口（定义接口url，传参和返回数据），在postman测试接口
3. 在service文件中编写登录的接口调用方法
4. 被某个actionCreator调用, 传入表单数据(values)
5. 在reducer中将返回的authToken和当前user信息进行存储（remember?localStorage:sessionStorage)
### 7. 权限控制
#### (1). 登录与否
登录才可访问：adminRoutes（个人中心，通知中心，系统设置，文章增删改）, 无需登录：commonRoutes（登录，首页看板，文章列表查看)
- routes.js
```js
 export const mainRoutes = [
  { path: "/login", component: Login },
  { path: "/404", component: NotFound }
];
export const adminRoutes = [
  {
    path: "/admin/dashboard",
    component: Dashboard,
    exact: true,
    icon: "dashboard",
    title: "看板",
    isNav: true,
    roles: ["001", "002", "003"] // 管理员，用户，游客
  },
  ...]
```
{isLogin?adminRoutes:commonRoutes}
#### (2). 角色权限
根据当前user的role与adminRoutes中规定的权限roles进行比较, 进一步控制adminRoutes中的可访问页面（001： admin(所有), 002： 登录用户(除设置，文章增删), 003: 游客（commonRoutes)
- App.js
```js
{adminRoutes.map(item=>{const hasPermission = item.roles.includes(user.role)；
hasPermissioin ? <Component .../> : <Redirect to="/noAuth"/>})}
```
### 8. 其他路由知识
withRouter: 非<Router>组件也可获取路由信息props（eg: 顶部栏是非<Router>页面组件，但它需要获取当前路由来高亮当前菜单项，
```js
// Frame.js 导航
import {withRouter} from "react-router-dom"
export default withRouter(Frame)
this.props.location.pathname)
```
render vs component
```js
<Router component={Home}/>
<Router render={routeProps => return <Home .{...routeProps} title="我是首页标题" />} />
```
### 9. echart
### 10. img引用(本地，网络（右键，f12)，切图)
### 11. 文件上传antd-<Upload>, 头像antd<Avatar/>,logo,icon,svg
### 12. 样式： scss，styled-components, css动画： react-transition-group


