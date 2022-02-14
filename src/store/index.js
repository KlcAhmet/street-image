import { createStore } from 'vuex'
import Search from '@/store/modules/search'

export default createStore({
  state: {
    search_loading: false,
  },
  mutations: {
    SET_SEARCH_LOADING: (state) =>
      (state.search_loading = !state.search_loading),
  },
  actions: {},
  modules: {
    Search,
  },
})
