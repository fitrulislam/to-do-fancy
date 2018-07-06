import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: []
  },
  mutations: {
    addDataFromDB (state, payload) {
      state.list = payload
    },
    addNewDataFromDB (state, payload) {
      state.list.push(payload)
    },
    editToDo (state, payload) {
      state.list.forEach(one => {
        if (one._id === payload && one.status === 'unfinished') {
          one.status = 'finished'
        } else if (one._id === payload && one.status === 'finished') {
          one.status = 'unfinished'
        }
      })
    },
    removeData (state, payload) {
      let newList = []
      state.list.forEach(todo => {
        if (todo._id !== payload) {
          newList.push(todo)
        }
      })
      state.list = newList
    }
  },
  actions: {
    addDataFromDB ({commit}) {
      axios.get('https://todofancy.roarized.com/list/read', {
        headers: {token: localStorage.getItem('token')}
      })
        .then(response => {
          commit('addDataFromDB', response.data.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addDataToDB ({commit}, payload) {
      axios.post('https://todofancy.roarized.com/list/create', payload, {
        headers: {token: localStorage.getItem('token')}
      })
        .then(response => {
          commit('addNewDataFromDB', response.data.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    removeDataFromDB ({commit}, payload) {
      axios.delete(`https://todofancy.roarized.com/list/delete/${payload}`)
        .then(response => {
          commit('removeData', payload)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})
