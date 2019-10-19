import service from "./index";
const ARTICLE_URL = "/api/v1/articles";
// offset limited: 分页
export const fetchArticles = (offset = 0, limited = 10) => {
  return service.post(ARTICLE_URL, { offset, limited });
};
export const deleteArticle = id => {
  return service.delete(`${ARTICLE_URL}/${id}`);
};
export const fetchArticle = id => {
  return service.post(`${ARTICLE_URL}/${id}`);
};
export const updateArticle = (id, values) => {
  return service.put(`${ARTICLE_URL}/${id}`, values);
};
// 近6个月的浏览量统计
export const fetchAmounts = () => {
  return service.post(`${ARTICLE_URL}/amount`);
};
