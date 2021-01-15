import { getCatesApi } from "@/apis/app_apis";

// getters
const state = () => ({
  cates: []
})

// getters
const getters = {}

// mutations
const mutations = {
  setCates(state, cates) {
    state.cates = cates
    console.log(state.cates)
  },
}

// actions
const actions = {
  async getCates({ commit, state }) {
    if (!state.cates.length) {
      const response = await getCatesApi()
      commit('setCates', response.data)
    }
  },
}


export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}