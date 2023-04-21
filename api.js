import { renderApp } from "./render.js";

// let nameInputElement = document.getElementById("input-authorName");
// const textInputElement = document.getElementById("input-text");
// const buttonElement = document.getElementById("button-send");
// const addCommentFormEl = document.getElementById("add-comment-form");
// const loadingEl = document.getElementById("loading-pic");

const host =  "https://webdev-hw-api.vercel.app/api/v2/sergei-stepanov/comments";

let token = null

function getComments({token}) {
   return fetch(
      host,
      {
        method: "GET",
        headers: {
          Authorization: token,
        }
      })
      .then((response) => {
        return response.json();
      })
  }

function addComment({text, token}) {
   return fetch(
      host,
      {
        method: "POST",
        body: JSON.stringify({
              text,
        }),
        headers: {
          Authorization: token,
        },
      }
    )
      .then((response) => {
        if (response.status === 400) {
                      throw new Error("400");
                    }
        console.log(response.status)
        return response.json()
    });
//         if (response.status === 400) {
//           throw new Error("400");
//         }
//         if (response.status === 500) {
//           throw new Error("Сервер сломался");
//         }
//         getComments(commentsArr
// , element);
//       })
//       .catch((error) => {
//         if (error.message === "400") {
//           alert("Имя и комментарий должны быть не короче 3 символов");
//         } else if (error.message === "Сервер сломался") {
//           console.log("Сервер сломался");
//           buttonElement.click();
//         } else {
//           alert("Кажется, у вас сломался интернет, попробуйте позже");
//         }
//         addCommentFormEl.style.display = "flex";
//         loadingEl.style.display = "none";
//         const spanElement = element.lastChild;
//         spanElement.remove();
//       });
  }

  function loginUser({login, password}) {
    return fetch(
        "https://webdev-hw-api.vercel.app/api/user/login",
       {
         method: "POST",
         body: JSON.stringify({
             login,
             password,
         }),
       }
     )
       .then((response) => {
        if (response.status === 400){
            throw new Error ('Неверный логин или пароль')
        }
         return response.json()
     });
    }

  function registerUser({name, login, password}) {
    return fetch(
        "https://webdev-hw-api.vercel.app/api/user",
       {
         method: "POST",
         body: JSON.stringify({
            name,
             login,
             password,
         }),
       }
     )
       .then((response) => {
        if (response.status === 400){
            throw new Error ('Пользователь с таким логином уже сущетсвует')
        }
         return response.json()
     });
    }

    function deleteComment( {id, token}) {
        return fetch( "https://webdev-hw-api.vercel.app/api/v2/sergei-stepanov/comments/" + id, {
                    method: "DELETE",
                    headers: {
                    Authorization: token,
                    },
           })
           .then((response) => {
            return response.json();
           })
        }

        function likeCommentToggle({token, id}) {
            return fetch(
                "https://webdev-hw-api.vercel.app/api/v2/sergei-stepanov/comments/" + id + "/toggle-like",
               {
                 method: "POST",
                 headers: {
                    Authorization: token,
                  },
                 })
               .then((response) => {
                 return response.json()
             });
            }
        
  export {getComments, addComment,  loginUser, registerUser, deleteComment, likeCommentToggle}