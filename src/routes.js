import {
  Login,
  NotFound,
  Dashboard,
  ArticleList,
  Settings,
  Notifications,
  NoAuth,
  Profile,
  ArticleForm
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
    isNav: true,
    roles: ["001", "002", "003"] // 管理员，用户，游客
  },
  {
    path: "/admin/article",
    component: ArticleList,
    exact: true,
    icon: "unordered-list",
    title: "文章管理",
    isNav: true,
    roles: ["001", "002"]
  },
  {
    path: "/admin/article/edit/:id",
    component: ArticleForm,
    roles: ["001"]
  },
  {
    path: "/admin/article/create",
    component: ArticleForm,
    roles: ["001"]
  },
  {
    path: "/admin/settings",
    component: Settings,
    icon: "setting",
    title: "设置",
    isNav: true,
    roles: ["001"]
  },
  {
    path: "/admin/notifications",
    component: Notifications,
    roles: ["001", "002"]
  },
  {
    path: "/admin/noauth",
    component: NoAuth,
    roles: ["001", "002", "003"]
  },
  {
    path: "/admin/profile",
    component: Profile,
    roles: ["001", "002"]
  }
];
