import Vue from 'vue'
import Vuex from 'vuex'
import uuid from 'uuid/v4'

import { find, chain, truncate } from 'lodash'

import games from './games'
import components from './components'
import sources from './sources'

import persistence from './local_store_persistence'

Vue.use(Vuex)

const PersistToLocalStore = store => {
  store.subscribe((mutation, state) => {
    persistence.saveState(state)
  })
}

const EMPTY_STATE = {
  idToken: null,
  authenticated: false,
  profile: {
    name: '',
    avatarSrc: ''
  },
  // games: [],
  // sources: [],
  selectedGame: null,
  activeComponent: null
}

let store = new Vuex.Store({
  // Throw errors if state is touched outside of mutations
  strict: process.env.NODE_ENV !== 'production',

  plugins: [PersistToLocalStore],

  state: EMPTY_STATE,

  modules: { games, components, sources },

  getters: {
    activeGame: (state) => state.selectedGame,

    activeSource: (state) => (state.activeComponent || { }).source,

    activeSourceProperties: (state, getters) => {
      if(getters.activeSource) {
        return getters.sourceProperties(getters.activeSource)
      } else {
        return null
      }
    },

    activeSourcePropertyExamples: (state, getters) => (propertyName) => {
      let propertyIndex = getters.activeSourceProperties.indexOf(propertyName)

      return chain(getters.activeSource.data.values)
        .map((row) => row[propertyIndex])
        .compact()
        .slice(1, 4)
        .map((content) => truncate(content, { length: 24, separator: /,? +/ }))
        .join(', ')
      .value()
    }
  },

  mutations: {
    logout (state) {
      state.authenticated = false
      state.idToken = null
      state.profile.name = ''
      state.profile.avatarSrc = ''
    },

    authenticateAs (state, { idToken }) {
      state.authenticated = true
      state.idToken = idToken
    },

    setProfile(state, { profile }) {
      state.profile = state.profile || {}
      state.profile.name = profile.name
      state.profile.avatarSrc = profile.avatarSrc
    },

    setSelectedGame (state, { gameId }) {
      let foundGame = find(state.games.games, { id: gameId })
      if(!foundGame) {
        throw new Error(`No game found with id: ${gameId}`)
      }

      state.selectedGame = foundGame
    },

    setActiveComponent(state, { component }) {
      let foundComponent = find(state.selectedGame.components, { id: component.id })
      if(!foundComponent) {
        throw new Error(`No component found: ${component}`)
      }

      state.activeComponent = foundComponent
    },

    clearActiveComponent(state) {
      state.activeComponent = null
    },

  },

  actions: {
    loadStateFromDB(context, { idToken }) {
      console.log("Logging in ID:", idToken)

      let profile = persistence.loadProfile(idToken) || {}
      context.commit("setProfile", { profile })

      let games = persistence.loadGames(idToken) || []
      context.commit("setGames", { games })

      let sources = persistence.loadSources(idToken) || []
      context.commit("setSources", { sources })

      context.commit("authenticateAs", { idToken })
    },

    setSelectedGame(context, { gameId }) {
      context.commit("setSelectedGame", { gameId })
    },

  }
})

let idToken = persistence.loadIdToken()

if(idToken) {
  store.dispatch("loadStateFromDB", { idToken })
} else {
  //
}

export default store
