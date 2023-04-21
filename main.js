import { getComments} from "./api.js";
import { renderApp } from "./render.js";

const appEl = document.getElementById("app");

let comments = [];
let token = null;

    // лоадер при загрузке страницы  
appEl.insertAdjacentHTML(
    "afterbegin",
    "<span>Подождите, список загружается...</span>")

    // получаем данные с сервера и рендерим
  export  const fetchCommentsAndRender = (userName, token) => {
       return getComments({token}).then((responseData) => {
                comments = responseData.comments.map((comment) => {
                  return {
                    name: comment.author.name,
                    date: new Date(comment.date)
                      .toLocaleString()
                      .slice(0, -3)
                      .replace(",", ""),
                    text: comment.text,
                    likeCounter: comment.likes,
                    isLiked: comment.isLiked,
                    isEdit: false,
                    id: comment.id,
                  };
                });
                renderApp(comments, userName);
              });
            }
            
    fetchCommentsAndRender()
