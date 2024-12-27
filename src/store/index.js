import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
    allAssetsData: null,
    assetName: null,
    marketInfo: null,
    fxRates: null,
    searchLog: []
  },

  getters: {},

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
    saveSearchLog(state, payload) {
      let duplCheck = state.searchLog.find(e => e === payload);
      
      if(duplCheck === undefined) { 
        state.searchLog.push(payload);
      }
    }
  },

  actions: {},

  modules: {},

  plugins: [
    createPersistedState({
      paths: ['searchLog']
    })
  ]

});
