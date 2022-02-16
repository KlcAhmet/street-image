import { createStore } from 'vuex'
import Search from '@/store/modules/search'

export default createStore({
  state: {
    loading: false,
    selectedImages: null,
  },
  mutations: {
    SET_SELECTED_IMAGES: (state, payload) => (state.selectedImages = payload),
    SET_LOADING: (state) => (state.loading = !state.loading),
  },
  actions: {
    async routerPush({ commit }, name) {
      commit('SET_LOADING')
      await this.$router.push({ name: name })
      commit('SET_LOADING')
    },
    async routerGo({ commit }, index) {
      commit('SET_LOADING')
      await this.$router.go(index)
      commit('SET_LOADING')
    },
  },
  modules: {
    Search,
  },
})
