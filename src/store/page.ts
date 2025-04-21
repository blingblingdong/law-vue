import { defineStore } from 'pinia'

interface othersourceitem {
  name: string,
  id: string,
  sourcetype: string,
}


export const useUiStore = defineStore('ui', {
  state: (): {
    currentPage: string
    actionFlag: boolean
    searchItem: othersourceitem
  } => ({
    currentPage: '查詢',
    actionFlag: false,
    searchItem: {
      id: '',
      name: '',
      sourcetype: ''
    }
  }),

  actions: {
    goToPageWithAction(page: string) {
      this.currentPage = page
      this.actionFlag = true
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
        name: `大法官解釋${num}`,
        sourcetype: "oldinterpretation",
      }
    }
  }
})

