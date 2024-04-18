import { createStore } from 'vuex'

export default createStore({
  state: {
    allAssetsData: null,
    assetName: null,
    fxRates: null
  },
  getters: {
  },
  mutations: {
    setAllAssetsData(state, payload) {
      state.allAssetsData = payload;
    },
    getAssetName(state, payload) {
      state.assetName = 
      state.allAssetsData[state.allAssetsData.findIndex(e => e.TICKER === payload)].NAME;
    },
    setFxRates(state, payload) {
      state.fxRates = payload;
    }
  },
  actions: {
  },
  modules: {
  }
})
