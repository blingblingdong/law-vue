import { defineStore } from 'pinia'
import { nextTick } from 'vue'

interface othersourceitem {
  name: string,
  id: string,
  sourcetype: string,
}

export const useAccountStore = defineStore('account', {
  state: (): {
    username: string | null
    email: string,
    loginflag: boolean
    token: string | null
    picture: string,
  } => ({
    username: null,
    email: "",
    loginflag: false,
    token: null,
    picture: "dog",
  }),

  actions: {
    async find_token(apiurl: string) {
      let response = await fetch(`${apiurl}/find_token_in_redis/${this.username}`, {
        method: 'POST',
      });
      if (response.ok) {
        let tk = await response.text();
        this.token = tk;
        this.loginflag = true;
      } else {
        alert("您的登入已罹於時效，請重新登入")
      }
    },

    async login(email: string, password: string, apiurl: string) {
      const response = await fetch(`${apiurl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      if (response.ok) {
        const data = await response.json();
        this.email = email;
        this.token = data.token;
        this.username = data.user_name;
        this.loginflag = true;
        localStorage.setItem("username", this.username as string);
        localStorage.setItem("email", this.email);
      } else {
        alert("登入失敗");
        this.loginflag = false;
      }
    },

    async registration(email: string, name: string, apiurl: string, password: string) {
      const response = await fetch(`${apiurl}/registration`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_name: name,
          email: email,
          password: password
        })
      });

      if (response.ok) {
        alert("註冊已生效力，請重新登入");
      } else {
        alert("註冊失敗...");
      }
    }

  }
})


export const useUiStore = defineStore('ui', {
  state: (): {
    currentPage: string
    actionFlag: boolean
    searchItem: othersourceitem
    searchPosition: number
    notePosition: number
  } => ({
    currentPage: '查詢',
    actionFlag: false,
    searchItem: {
      id: '',
      name: '',
      sourcetype: ''
    },
    searchPosition: 0,
    notePosition: 0,
  }),

  actions: {
    async goToPageWithAction(page: string) {
      // 1.先把目前頁面的位置保存
      switch (this.currentPage) {
        case '查詢':
          this.searchPosition = window.scrollY;
          break;
        case '資料夾':
          this.notePosition = window.scrollY;
          break;
      }

      await nextTick();

      this.currentPage = page
      this.actionFlag = true

      await nextTick();

      switch (page) {
        case "查詢":
          window.scrollTo({ top: this.searchPosition });
          break;
        case "資料夾":
          window.scrollTo({ top: this.notePosition });
          break;
      }

    },

    goToLawPage(lawname: string) {
      this.currentPage = "查詢"
      this.searchItem = {
        id: lawname,
        name: lawname,
        sourcetype: "lawname"
      }
    },

    goToOldInter(num: string) {
      this.currentPage = "查詢"
      this.searchItem = {
        id: num,
        name: `釋字${num}`,
        sourcetype: "oldinterpretation",
      }
    },

    goToFile(id: string) {
      this.currentPage = "查詢"
      const [user, foldername, filename] = id.split('-');
      this.searchItem = {
        id: id,
        name: filename,
        sourcetype: "note",
      }
    },

  }
})

