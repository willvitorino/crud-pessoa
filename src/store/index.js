import Vue from 'vue'
import Vuex from 'vuex'

import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from '../shared/db'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pessoas: []
  },
  mutations: vuexfireMutations,
  actions: {
    bindPessoas: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef('pessoas', db.collection('pessoas'))
    })
  }
  // modules: {}
})
