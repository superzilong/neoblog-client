import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "/api/articles/";

class ArticleService {
  createArticle(title, content, html, summary, datetime) {
    return axios.post(
      API_URL,
      {
        title: title,
        mdContent: content,
        htmlContent: html,
        summary: summary,
        publishDate: datetime
      },
      {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: authHeader()["Authorization"]
        }
      }
    );
  }

  getArticleList() {
    return axios.get(API_URL + "/lite", {
      headers: { "Content-Type": "application/json;charset=UTF-8" }
    });
  }
}
export default new ArticleService();
