import Vue from 'vue'
import Vuex from 'vuex'

import persistence from './local_store_persistence'
import auth from '../auth'

Vue.use(Vuex)

const EMPTY_STATE = {
  idToken: null,
  authenticated: false,
  profile: {
    name: '',
    avatarSrc: ''
  },
  games: []
}

let store = new Vuex.Store({
  state: EMPTY_STATE,

  mutations: {
    logout (state) {
      state.idToken = null
      state.authenticated = false
      state.profile.name = ''
      state.profile.avatarSrc = ''

      persistence.saveState(state)
    },

    authenticateAs (state, payload) {
      state.idToken = payload.idToken
      state.authenticated = true
      state.profile.name = payload.profile.name
      state.profile.avatarSrc = payload.profile.avatarSrc

      persistence.saveState(state)
    }
  },

  actions: {
    login () {
      auth.promptForLogin()
    },

    loggedInAs (context, { idToken }) {
      console.log('loggedInAs', idToken)
      let profile = persistence.loadProfile(idToken)

      let commitProfile = function() {
        context.commit("authenticateAs", { idToken, profile })
      }

      if(!profile) {
        auth.getProfile(idToken, (error, fetchedProfile) => {
          if(error) {
            console.error("Error fetching profile for:", idToken)
            console.error(error.message)
          } else {
            console.log("Profile fetched from Auth0")
            profile = fetchedProfile
            profile.avatarSrc = profile.picture
            commitProfile()
          }
        })
      } else {
        console.log("Profile fetched from localStorage")
        commitProfile()
      }
    }
  }
})

let idToken = persistence.loadToken()

if(idToken) {
  // Log in with a persisted token
  console.log("Logging in from localStorage")
  store.dispatch("loggedInAs", { idToken })

} else {
  // Log in with Auth0
  auth.on("authenticated", ({ idToken }) => {
    console.log("Logging in from Auth0")
    store.dispatch("loggedInAs", { idToken })
  })
}

export default store
