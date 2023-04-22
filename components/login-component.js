import {loginUser, registerUser} from "../api.js"

export function renderloginAndRegisterComponent({appEl, setToken, fetchCommentsAndRender}) {
let isLoginMode = true;
    const renderForm = () => {
        const appHtml = 
                `<div class="container">
                    <div class="login" id="login-block">
                    <p class="login-form">Форма ${isLoginMode ? 'входа' : 'регистрации'}</p>
                    ${isLoginMode 
                        ? ""
                        :
                        `<input
                        type="text"
                        class="add-login-name"
                        id="name-input"
                        placeholder="Введите ваше имя"
                        />`
                    }
                        <input
                        type="text"
                        class="add-login-name"
                        id="login-input"
                        placeholder="Введите login"
                        />
                        <input
                        type="password"
                        class="add-password"
                        id="password-input"
                        placeholder="Введите пароль"
                        />
                        <div class="">
                        <button class="login-btn" id="login-button">${isLoginMode ? 'Войти' : 'Зарегистрироваться'}</button>
                        </div>
                        <a href="#" class="registration-link" id="toggle-button">Перейти ${isLoginMode ? 'к регистрации' : 'ко входу'}</a>
                    </div>
                </div>`

    appEl.innerHTML = appHtml;

    const loginButton = document.getElementById('login-button')
    document.addEventListener("keyup", (e) => {
        if (e.code == "Enter") {
        loginButton.click();
        }
      })

    loginButton.addEventListener('click', () => {
       
        if (isLoginMode) {
            const login = document.getElementById('login-input').value
            const password = document.getElementById('password-input').value;
     
             if (!login) {
                 alert('Введите логин')
                 return;
             }
             if (!password) {
                 alert('Введите пароль')
                 return;
             }
     
             loginUser ({
                 login: login,
                 password: password,
             }).then((user)=>{
                 setToken(`Bearer ${user.user.token}`)
                 const userName = user.user.name 
                 let token = user.user.token
                 console.log(token) 
                 fetchCommentsAndRender(userName, `Bearer ${token}`)
                  
             })
             .catch((error) => {
                // TODO: Выводить алерт красиво
                alert(error.message);
              });
        } else {
      
            const login = document.getElementById('login-input').value
            const password = document.getElementById('password-input').value;
            const name = document.getElementById('name-input').value;
            if (!name) {
                alert('введите имя')
            }
            if (!login) {
                alert('введите логин')
            }
            if (!password) {
                alert('введите пароль')
            }
            
            registerUser ({
                name: name,
                login: login,
                password: password,
            }).then((user)=>{
                setToken(`Bearer ${user.user.token}`)
                const userName = user.user.name 
                let token = user.user.token
                fetchCommentsAndRender(userName, `Bearer ${token}`)
            })
            .catch((error) => {
                // TODO: Выводить алерт красиво
                alert(error.message);
              });
        }
    })

    document.getElementById('toggle-button').addEventListener('click', () => {
        isLoginMode = !isLoginMode;
        renderForm()
    })
}
renderForm()
}
