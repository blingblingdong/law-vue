<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import type { UrlGallery } from './types/Folder.ts'

const ApiUrl = 'https://deploylawweb-production.up.railway.app'
import { useAccountStore } from './store/page.ts'
const account = useAccountStore();


onMounted(async () => {
  loginmail.value = account.email;
})


const loginOrSignup = ref("login")
const loginmail = ref('');
const loginpassword = ref('');
const signupmail = ref('');
const signuppassword = ref('');
const signupname = ref('');

import { getApiUrl } from './utils/api'
const ApiLink = getApiUrl();



const login = async () => {
  await account.login(loginmail.value, loginpassword.value, ApiUrl);
}

const signup = async () => {
  if (!signupmail.value || !signupmail.value.includes('@')) {
    swal("請輸入有效的信箱");
    return;
  }


  let newAccount = { user_name: signupname.value, email: signupmail.value, password: signuppassword.value };
  let res = await fetch(`${ApiLink}/registration`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newAccount),
  });
  if (res.ok) {
    swal("註冊成功")
  } else {
    swal("註冊失敗")
  }
}

const signout = () => {
  account.loginflag = false;
  localStorage.removeItem("username");
  localStorage.removeItem("email");
}

</script>

<template>
  <div v-if="account.loginflag">
    <div id="enter-state">
      <img :src="'/' + account.picture + '.png'">
      <h2>{{ account.username }}</h2>
      <h3>{{ account.email }}</h3>
      <p @click="signout">sign out</p>
    </div>
  </div>
  <div v-else>
    <div v-if="loginOrSignup === 'login'" id="login-form">
      <p>Login!</p>
      <div class="input-row">
        <span>email</span>
        <input v-model="loginmail" type="email"></input>
      </div>
      <div class="input-row">
        <span>password</span>
        <input v-model="loginpassword"></input>
      </div>
      <p @click="login">login</p>
      <a @click="loginOrSignup = 'signup'">Don't Have Account? SignUp!</a>
    </div>
    <div v-if="loginOrSignup === 'signup'" id="signup-form">
      <p>Sign Up!</p>
      <div class="input-row">
        <span>name</span>
        <input v-model="signupname"></input>
      </div>
      <div class="input-row">
        <span>email</span>
        <input v-model="signupmail" type="email"></input>
      </div>
      <div class="input-row">
        <span>password</span>
        <input v-model="signuppassword"></input>
      </div>
      <p @click="signup">signup</p>
      <a @click="loginOrSignup = 'login'">Already Have Account? Login!</a>
    </div>
  </div>
</template>

<style scoped>
#enter-state {
  display: flex;
  margin-top: 20vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

#enter-state img {
  width: 100px;
  border-radius: 50%;
}

#enter-state p:hover,
#login-form p:hover,
#signup-form p:hover {
  border: 1px solid var(--text-color);
  border-radius: 5px;
  cursor: pointer;
}

#enter-state p,
#login-form p,
#signup-form p {
  padding: 10px;
}

#login-form,
#signup-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  margin-top: 20vh;
}

.input-row input {
  padding: 10px 10px;
  width: 300px;
}

.input-row {
  display: flex;
  gap: 5px;
  align-items: center;
}

#realbody {
  display: grid;
  grid-template-columns: 1fr 100fr;
  gap: 10px;
}


#thesidebar {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  position: sticky;
  top: 5%;
  margin-top: 40px;
}

#bars {
  position: fixed;
  top: 5%;
}


.ham-but {
  display: none;
  top: 30px;
  right: 0px;
  font-size: 30px;
  background-color: black;
  color: var(--text-color);
  border: none;
}

#pagelist {
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 50px;
  position: sticky;
}

#pagelist i {
  font-size: 20px;
}



#app,
body {
  background-color: black !important;
  color: var(--text-color) !important;
}

.header-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  top: 10px;
  z-index: 0;
}


#small-header {
  display: none;
}

option {
  font-size: 20px;
}


.header-title {
  font-size: 25px;
  color: var(--primary-color);
  text-align: center;
  font-family: "Playwrite DE Grund", cursive;
}

@media only screen and (max-width: 600px) {}


.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
}

.navbar li:not(:last-child) {
  margin-right: 50px;
}

.navbar li:last-child {
  margin-right: 20px;
}

.main-li {
  font-weight: 700;
  text-align: center;
}

.main-li a {
  display: flex;
  color: var(--text-color);
  text-align: center;
  font-size: 18px;
  text-decoration: none;
}

.navbar a:hover {
  color: var(--primary-color);
  cursor: pointer;
}



.sidebar {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 250px;
  z-index: 999;
  opacity: 0.8;
  background-color: black;
  list-style: none;
}

.sidebar li {
  padding: 10px 5px;

}

.header {
  display: flex;
  justify-content: center;
}

.main-li a {
  z-index: 9999 !important;
  position: relativeri
}


.catpng {
  width: 50px;
  border-radius: 50%;
}
</style>
