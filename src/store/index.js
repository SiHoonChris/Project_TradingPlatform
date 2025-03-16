import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
    dateFrom: '',
    dateTo: '',
    expenseMin: 0,
    expenseMax: 0,
    transactionType: '',


    
    allAssetsData: null,
    assetName: null,
    marketInfo: null,
    fxRates: null,
    searchLog: []
  },

  getters: {},

  mutations: {
    updateTransactionCondition(state, payload) {
      state.dateFrom        = payload.dateFrom;
      state.dateTo          = payload.dateTo;
      state.expenseMin      = payload.expenseMin;
      state.expenseMax      = payload.expenseMax;
      state.transactionType = payload.transactionType;
    },



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
