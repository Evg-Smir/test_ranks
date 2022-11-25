import axios from "axios";
import config from "assets/config/config";

const baseUrl = 'https://api.exchangerate.host/'

export const state = () => ({
  convertValue: '0.000',
  currentArray: [],
})

export const getters = {
  CONVERT_VALUE: state => state.convertValue,
  CURRENT_ARRAY: state => state.currentArray,
}

export const mutations = {
  SET_CONVERT(state, data) {
    state.convertValue = data.result === null ? config[this.$i18n.locale].error : data.result
  },
  SET_CURRENT(state, data) {
    state.currentArray = Object.entries(data).map(item => {
      return {
        name: item[0],
        value: item[1],
      }
    })
  },
  SET_ERROR(state, data) {
    state.convertValue = data
  }
}

export const actions = {
  GET_CONVERT({commit}, base) {
    const options = {
      method: 'GET',
      url: `${baseUrl}convert`,
      params: { from: base[1], to: base[2], amount: base[0] },
    };

    axios(options)
      .then(response => { commit('SET_CONVERT', response.data) })
      .catch( error => { console.error(error) })
  },
  GET_CURRENCY({commit}, base){
    const options = {
      method: 'GET',
      url: `${baseUrl}latest`,
      params: { base },
    };

    axios(options)
      .then(response => { commit('SET_CURRENT', response.data.rates) })
      .catch( error => { console.error(error) })
  },
  GET_ERROR({commit}, error) {
    commit('SET_ERROR', error)
  }
}
