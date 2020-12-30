// getters
const state = () => ({
  token: null
})

// getters
const getters = {}

// mutations
const mutations = {
  setToken(state, token) {
    state.token = token;
    console.log(token)
  }
}

// actions
const actions = {}


export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}