import {
  Login,
  NotFound,
  Dashboard,
  ArticleList,
  ArticleEdit,
  Settings
} from "./pages";
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
    isNav: true
  },
  {
    path: "/admin/article",
    component: ArticleList,
    exact: true,
    icon: "unordered-list",
    title: "文章列表",
    isNav: true
  },
  {
    path: "/admin/article/edit/:id",
    component: ArticleEdit,
    title: "文章编辑",
    isNav: false
  },
  {
    path: "/admin/settings",
    component: Settings,
    icon: "setting",
    title: "设置",
    isNav: true
  }
];
