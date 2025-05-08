import { defineStore } from 'pinia';
export const useAccountStore = defineStore('account', {
    state: () => ({
        username: null,
        email: "",
        loginflag: false,
        token: null,
        picture: "dog",
    }),
    actions: {
        async find_token(apiurl) {
            let response = await fetch(`${apiurl}/find_token_in_redis/${this.username}`, {
                method: 'POST',
            });
            if (response.ok) {
                let tk = await response.text();
                this.token = tk;
                this.loginflag = true;
            }
            else {
                alert("您的登入已罹於時效，請重新登入");
            }
        },
        async login(email, password, apiurl) {
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
                localStorage.setItem("username", this.username);
                localStorage.setItem("email", this.email);
            }
            else {
                alert("登入失敗");
                this.loginflag = false;
            }
        },
        async registration(email, name, apiurl, password) {
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
            }
            else {
                alert("註冊失敗...");
            }
        }
    }
});
export const useUiStore = defineStore('ui', {
    state: () => ({
        currentPage: '查詢',
        actionFlag: false,
        searchItem: {
            id: '',
            name: '',
            sourcetype: ''
        }
    }),
    actions: {
        goToPageWithAction(page) {
            this.currentPage = page;
            this.actionFlag = true;
        },
        goToLawPage(lawname) {
            this.currentPage = "查詢";
            this.searchItem = {
                id: lawname,
                name: lawname,
                sourcetype: "lawname"
            };
        },
        goToOldInter(num) {
            this.currentPage = "查詢";
            this.searchItem = {
                id: num,
                name: `釋字${num}`,
                sourcetype: "oldinterpretation",
            };
        },
        goToFile(id) {
            this.currentPage = "查詢";
            const [user, foldername, filename] = id.split('-');
            this.searchItem = {
                id: id,
                name: filename,
                sourcetype: "note",
            };
        },
    }
});
