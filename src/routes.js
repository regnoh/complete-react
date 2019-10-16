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
  { path: "/admin/dashboard", component: Dashboard, exact: true },
  { path: "/admin/article", component: ArticleList, exact: true },
  { path: "/admin/article/edit/:id", component: ArticleEdit },
  { path: "/admin/settings", component: Settings }
];
