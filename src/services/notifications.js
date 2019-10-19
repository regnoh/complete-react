import service from "./index";
const NOTIFICATIONS_URL = "/api/v1/notifications";
// offset limited: 分页
export const fetchNotifications = (offset = 0, limited = 10) => {
  return service.post(NOTIFICATIONS_URL, { offset, limited });
};
