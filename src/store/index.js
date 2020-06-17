import Vue from "vue"
import Vuex from "vuex"
import helpers from '../helpers'

Vue.use(Vuex);

const state = {
  title: '',
  ingredients: [],
}

const actions = {
  updateTitle({ commit }, title) {
    commit('updateTitle', title)
  },
  addIngredient({ commit }, payload) {
    commit('addIngredient', payload)
  },
  removeIngredient({ commit }, payload) {
    commit('removeIngredient', payload)
  },
  updateIngredient({ commit }, payload) {
    commit('updateIngredient', payload)
  },
  adjustWeights({ commit }, payload) {
    commit('adjustWeights', payload)
  },
  moveUp({ commit }, payload) {
    commit('moveUp', payload)
  },
  moveDown({ commit }, payload) {
    commit('moveDown', payload)
  },
}

const mutations = {
  updateTitle(state, title) {
    state.title = title
  },
  addIngredient(state, payload) {
    state.ingredients.unshift({
      id: helpers.randomInt(),
      name: payload.name,
      value: payload.value,
      type: payload.type,
      hydration: payload.hydration,
    })
  },
  updateIngredient(state, payload) {
    state.ingredients.splice(state.ingredients.indexOf(payload.old), 1, payload.new)
  },
  removeIngredient(state, payload) {
    state.ingredients.splice(state.ingredients.indexOf(payload), 1)
  },
  adjustWeights(state, payload) {
    state.ingredients.forEach((item) => {
      if (payload.oldWeight != 0) {
        item.value = helpers.round(item.value * (payload.newWeight / payload.oldWeight), 1)
      }
    })
  },
  moveUp(state, payload) {
    const currentIndex = state.ingredients.indexOf(payload)
    const current = state.ingredients[currentIndex]
    if (currentIndex >= 1) {
      const above = state.ingredients[currentIndex - 1]
      state.ingredients.splice(state.ingredients.indexOf(payload) - 1, 2, current, above)
    }
  },
  moveDown(state, payload) {
    const currentIndex = state.ingredients.indexOf(payload)
    const current = state.ingredients[currentIndex]
    if (currentIndex <= state.ingredients.length - 2) {
      const below = state.ingredients[currentIndex + 1]
      state.ingredients.splice(state.ingredients.indexOf(payload), 2, below, current)
    }
  }
}

const getters = {
  totalWeight(state) {
    return state.ingredients.reduce((total, item) => {
      return helpers.round(total += item.value, 1)
    }, 0)
  },
  allOfType(state) {
    return (type) => {
      return state.ingredients.filter((item) => {
        return item.type == type
      })
    }
  },
  allOfTypeNot(state) {
    return (type) => {
      return state.ingredients.filter((item) => {
        return item.type != type
      })
    }
  },
  totalOfType(state) {
    return (type) => {
      return state.ingredients.filter((item) => {
        return item.type == type
      }).reduce((total, item) => {
        return total += item.value
      }, 0)
    }
  },
  totalHydration(state, getters) {
    const result = (((getters.totalOfType('liquid') + getters.totalStarterLiquid) / (getters.totalOfType('dry') + getters.totalStarterDry)) * 100) || 0
    return helpers.round(result, 1)
  },
  totalStarterDry(state) {
    return state.ingredients.filter((item) => {
      return item.type == 'starter'
    }).reduce((total, item) => {
      return total += (item.value / ((item.hydration / 100) + 1))
    }, 0)
  },
  totalStarterLiquid(state) {
    return state.ingredients.filter((item) => {
      return item.type == 'starter'
    }).reduce((total, item) => {
      return total += item.value - (item.value / ((item.hydration / 100) + 1))
    }, 0)
  },
  stateToQuery(state) {
    const result = state.ingredients.reduce((url, item) => {
      return url+= 'name=' + item.name + '&'
        + 'value=' + item.value + '&'
        + 'type=' + item.type + '&'
        + 'hydration=' + item.hydration + '&'
    }, '')
    return result + '&title=' + encodeURIComponent(state.title)
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
})