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
    }

  }
})

