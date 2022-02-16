import { createStore } from 'vuex'
import Search from '@/store/modules/search'

export default createStore({
  state: {
    loading: true,
    selectedImages: null,
  },
  mutations: {
    SET_SELECTED_IMAGES: (state, payload) => (state.selectedImages = payload),
    SET_LOADING: (state, payload) => (state.loading = payload),
  },
  actions: {
    async routerPush({ commit }, name) {
      commit('SET_LOADING', true)
      await this.$router.push({ name: name })
      commit('SET_LOADING', false)
    },
    async routerGo({ commit }, index) {
      commit('SET_LOADING', true)
      await this.$router.go(index)
      commit('SET_LOADING', false)
    },
  },
  modules: {
    Search,
  },
})
