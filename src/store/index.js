import { createStore } from 'vuex'

export default createStore({
  state: {
    allAssetsData: null
  },
  getters: {
  },
  mutations: {
    setAllAssetsData(state, payload) {
      state.allAssetsData = payload;
    }
  },
  actions: {
  },
  modules: {
  }
})
