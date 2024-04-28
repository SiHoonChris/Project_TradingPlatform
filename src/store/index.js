import { createStore } from 'vuex'

export default createStore({
  state: {
    allAssetsData: null,
    assetName: null,
    marketInfo: null,
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
    getMarketInfo(state, payload) {
      state.marketInfo = 
      state.allAssetsData[state.allAssetsData.findIndex(e => e.TICKER === payload)].MARKET;
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
