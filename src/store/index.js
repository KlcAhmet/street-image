import { createStore } from 'vuex'
import Search from '@/store/modules/search'

export default createStore({
  state: {
    selectedImages: null,
  },
  mutations: {
    SET_SELECTED_IMAGES: (state, payload) => (state.selectedImages = payload),
  },
  actions: {},
  modules: {
    Search,
  },
})
