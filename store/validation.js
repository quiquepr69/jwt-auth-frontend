export const state = () => ({
  errors: {}
})

export const mutations = {
  SET_VALIDATIONS_ERRORS(state, errors) {
    state.errors = errors
  }
}

export const actions = {
  setErrors({ commit }, errors) {
    commit('SET_VALIDATIONS_ERRORS', errors)
  },
  clearErrors({ commit }) {
    commit('SET_VALIDATIONS_ERRORS', {})
  }
}

export const getters = {
  errors(state) {
    return state.errors
  }
}


  




 