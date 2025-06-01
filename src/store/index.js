import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
    btnSelected: 'Y',

    dateFrom: '',
    dateTo: '',
    expenseMin: 0,
    expenseMax: 0,
    transactionType: ''
  },

  getters: {},

  mutations: {
    setBtnSelected(state, payload) {
      state.btnSelected = payload;
    },

    updateTransactionCondition(state, payload) {
      state.dateFrom        = payload.dateFrom;
      state.dateTo          = payload.dateTo;
      state.expenseMin      = payload.expenseMin;
      state.expenseMax      = payload.expenseMax;
      state.transactionType = payload.transactionType;
    }
  },

  actions: {},

  modules: {},

  plugins: [
    createPersistedState({
      paths: []
    })
  ]
});
