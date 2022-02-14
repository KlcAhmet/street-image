export default {
  namespaced: true,

  state: () => ({
    headers: {
      baseURL: 'http://api.geonames.org',
      timeout: 5000,
    },
  }),

  getters: {},

  mutations: {},

  actions: {
    async findLocationInfo({ state, commit }, location) {
      commit('SET_SEARCH_LOADING', {}, { root: true })
      const res = await this.$axios.get(
        `searchJSON?q=${location}&username=${this.$env.VUE_APP_GEO_NAMES_USER}`,
        state.headers
      )

      if (!res.data.geonames.length) console.log(true) // todo no data

      const filteredLocations = res.data.geonames.map((item) => {
        return item.toponymName
      })
      console.log(filteredLocations)
      commit('SET_SEARCH_LOADING', {}, { root: true })
    },
  },
}
