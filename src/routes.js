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
    title: "看板",
    isNav: true
  },
  {
    path: "/admin/article",
    component: ArticleList,
    exact: true,
    title: "文章列表",
    isNav: true
  },
  {
    path: "/admin/article/edit/:id",
    component: ArticleEdit,
    title: "文章编辑",
    isNav: false
  },
  { path: "/admin/settings", component: Settings, title: "设置", isNav: true }
];
