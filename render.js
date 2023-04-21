import { addComment, deleteComment, likeCommentToggle} from "./api.js";
import {fetchCommentsAndRender} from  "./main.js"
import {renderloginAndRegisterComponent} from "./components/login-component.js"


const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


//   const initEditButtons = (commentsArr) => {
//     const editButtonElements = document.querySelectorAll(".edit-button");
//     const commentBodyElements = document.querySelectorAll(".comment-body");

//     editButtonElements.forEach((editButton, index) => {
//       editButton.addEventListener("click", (event) => {
//         const comment = commentsArr[index];
//         event.stopPropagation();
//         if (comment.isEdit) {
//           const newTextElement = document.querySelector("#new-text");
//           const newText = newTextElement.value;
//           comment.text = newText;
//             addComment({text: newText, token})
//             .then(() => {
//               fetchCommentsAndRender(userName);
//             })
//           //   fetch(
//         //     host,
//         //     {
//         //       method: "POST",
//         //       body: JSON.stringify({
//         //         text: comment.text
//         //           .replaceAll("<", "&lt")
//         //           .replaceAll(">", "&gt")
//         //           .replaceAll("QUOTE_BEGIN", '<div class="quote">')
//         //           .replaceAll("QUOTE_END", "</div>"),
//         //         name: comment.name
//         //           .replaceAll("<", "&lt")
//         //           .replaceAll(">", "&gt"),
//         //         forceError: true,
//         //       }),
//         //       headers: {
//         //         Authorization: token,
//         //       },
//         //     }
//         //   )
//             .then((response) => {
//               if (response.status === 400) {
//                 throw new Error("400");
//               }
//               if (response.status === 500) {
//                 throw new Error("Сервер сломался");
//               }
//             })
//             .catch((error) => {
//               if (error.message === "400") {
//                 alert("Имя и комментарий должны быть не короче 3 символов");
//               } else if (error.message === "Сервер сломался") {
//                 console.log("Сервер сломался");
//                 editButton.click();
//               } else {
//                 alert("Кажется, у вас сломался интернет, попробуйте позже");
//               }}
//             )
//             .then(() => {
//               commentBodyElements[
//                 index
//               ].innerHTML = `<div class="comment-text">
//                                                 ${comment.text}
//                                               </div>`;
//               editButton.textContent = "Редактировать";
//               comment.isEdit = false;
//             })
//             .catch((error) => {
//               alert("Кажется, у вас сломался интернет, попробуйте позже");
//               return;
//             });
//         } else {
//           editButton.textContent = "Сохранить";
//           comment.isEdit = true;
//           commentBodyElements[index].innerHTML = `<textarea
//                                                 type="textarea"
//                                                 class="add-form-text"
//                                                 id="new-text"
//                                                 rows="4"
//                                               >${comment.text}</textarea>`;
//         }
//       });
//     });
//   };

//   const initEditComments = (commentsArr) => {
//     const editCommentElements = document.querySelectorAll(".comment");

//     editCommentElements.forEach((editComment, index) => {
//       const comment = commentsArr[index];

//       editComment.addEventListener("click", (event) => {
//         if (
//           event.target.classList.contains("add-form-text") ||
//           event.target.classList.contains("edit-button")
//         ) {
//           return;
//         }
//         comment.text = comment.text
//           .replaceAll('<div class="quote">', "")
//           .replaceAll("</div>", "");
//         textInputElement.value =
//           `QUOTE_BEGIN ${comment.text}\n\n${comment.name} QUOTE_END`
//             .replaceAll("&lt", "<")
//             .replaceAll("&gt", ">");
//       });
//     });
//   };

let token = null;

const renderApp = (commentsArr, userName) => {

    const appEl = document.getElementById("app");

    const commentsHTML = commentsArr
      .map((comment) => {
        return `<li class="comment">
              <div class="comment-header">
                <div>${comment.name}</div>
                <div>${comment.date}</div>
              </div>
              <div class="comment-body">
                <div class="comment-text"> 
                 ${comment.text}
                </div>
              </div>
              <div class="comment-footer">
                <div class="likes">
                  <span class="likes-counter">${comment.likeCounter}</span>
                  <button class="like-button ${comment.isLiked ?  "-active-like" : ""} " data-id="${comment.id}"></button>
                </div>
              </div>`
            //   ${token ?  `<button class="add-form-button edit-button">Редактировать</button></li>`: "" }
      })              
              .join("");
    

const appHtml = 
                   `<ul class="comments" id="list">
                    ${commentsHTML}
                    </ul>
                    <div class="loading" id="loading-pic">
                        <img src="https://i.gifer.com/ZZ5H.gif" alt="loading..." />
                    </div>
                    ${token ? `<div class="add-form" id="add-comment-form">
                        <input
                        type="text"
                        class="add-form-name"
                        id="input-authorName" disabled
                        />
                        <textarea
                        type="textarea"
                        class="add-form-text"
                        id="input-text"
                        placeholder="Введите ваш коментарий"
                        rows="4"
                        ></textarea>
                        <div class="add-form-row">
                        <button class="add-form-button" id="button-send">Написать</button>
                        </div>
                    </div>
                    <div class="add-form-row">
                        <button class="add-form-button" id="button-delete">
                        Удалить последний комментарий
                        </button>
                    </div>` : `<p>Чтобы добавить комментарий, <a class="auth-link" id=auth>авторизуйтесь</a></p>`}`
        
appEl.innerHTML = appHtml;



const initLikeButton = (commentsArr, userName) => {

    document.querySelectorAll(".like-button").forEach((likeButton, index) => {

        likeButton.addEventListener("click", (event) => {
                    event.stopPropagation();
                    const id = likeButton.dataset.id;
                    likeCommentToggle({token, id})
                                    .then((responseData) => {
                                        console.log(responseData)
                                    // commentsArr[index].isLiked = responseData.result.isLiked
                                    fetchCommentsAndRender(userName, token)
                                   })
                                })
                            })
      
        // likeButton.classList.add("-loading-like");

        // delay(2000).then(() => {
        //   if (comments[index].likeButton == "-active-like") {
        //     comments[index].likeButton = "";
        //     comments[index].likeCounter--;
        //   } else {
        //     comments[index].likeButton = "-active-like";
        //     comments[index].likeCounter++;
        //   }
        //   renderApp(comments, userName);
        };
     

    
    if (!token) {
    
        document.getElementById("auth").addEventListener('click',()=>{
            renderloginAndRegisterComponent({appEl, setToken: (newToken) => {
                token = newToken;
            },
            fetchCommentsAndRender
         })
        })
    return;
    }
//гиф лоадер при добавлении комментария
const showLoading = () => {
    addCommentFormEl.style.display = "none";
    loadingEl.style.display = "block";
  };

    const lastComment = commentsArr[commentsArr.length - 1];
    const lastCommentId = lastComment.id;
    
     document.getElementById("button-delete");

    // удаление последнего комментария
    document.getElementById("button-delete").addEventListener("click", (event) => {
        event.stopPropagation();
        deleteComment({id: lastCommentId, token: token}).then(() => {
        fetchCommentsAndRender(userName, token)
        })
    })
    

    let nameInputElement = document.getElementById("input-authorName");
    const textInputElement = document.getElementById("input-text");
    function validateForm() {
        if (
          textInputElement.value.trim() === ""
        ) {
          buttonDisabled(buttonElement);
        } else {
          buttonElement.disabled = false;
          buttonElement.style.backgroundColor = "";
        }
      }
    
    textInputElement.addEventListener("input", validateForm);

   

    nameInputElement.value = userName;
   
    textInputElement.value = "";

    const buttonElement = document.getElementById("button-send");
        const buttonDisabled = () => {
            buttonElement.disabled = true;
            buttonElement.style.backgroundColor = "grey";
          };

          // добавляем комментарий 
    buttonElement.addEventListener("click", () => {
        listElement.insertAdjacentHTML(
            "beforeend",
            "<span>Комментарий загружается...</span>"
          )
          showLoading();
          const safeText = textInputElement.value
                .replaceAll("<", "&lt")
                .replaceAll(">", "&gt")
                .replaceAll("QUOTE_BEGIN", '<div class="quote">')
                .replaceAll("QUOTE_END", "</div>");
          addComment({text: safeText, token})
          .then(()=>{
            fetchCommentsAndRender(userName, token);   
       })
       .catch((error) => {
        // TODO: Выводить алерт красиво
        if (error.message === "400") {
             alert("Комментарий должен быть не короче 3 символов");
             }
             else {
                alert("Кажется, у вас сломался интернет, попробуйте позже");
             }
            addCommentFormEl.style.display = "flex";
            loadingEl.style.display = "none";
            const spanElement =listElement.lastChild;
            spanElement.remove();
        });       
     });
     
        const loadingEl = document.getElementById("loading-pic");
        const addCommentFormEl = document.getElementById("add-comment-form");
        const listElement = document.getElementById("list");

        // добавление комментария нажатием кнопки "ввод"
    document.addEventListener("keyup", (e) => {
        if (e.code == "Enter") {
          buttonElement.click();
        }
      })
    buttonDisabled();
    initLikeButton(commentsArr, userName);
    // initEditComments(commentsArr);
    // initEditButtons(commentsArr);
    addCommentFormEl.style.display = "flex";
    loadingEl.style.display = "none";
  };

  export {renderApp};