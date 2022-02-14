export default {
  namespaced: true,

  state: () => ({
    test: false,
  }),

  getters: {},

  mutations: {},

  actions: {
    async searchLocation({ commit }, searchLocations) {
      commit('SET_SEARCH_LOADING', {}, { root: true })

      /**
       * q: location name
       * username: api access key
       * more info: https://www.geonames.org/export/geonames-search.html
       * @type {string}
       */
      const locations = await this.$axios.get(
        `searchJSON?q=${searchLocations}&username=${this.$env.VUE_APP_GEO_NAMES_USER}`,
        {
          baseURL: 'http://api.geonames.org',
          timeout: 5000,
        }
      )

      if (!locations.data.geonames.length) console.log(true) // todo no data

      const filteredLocations = locations.data.geonames.map((item) => {
        return {
          name: item.toponymName,
          population: item.population,
          lat: item.lat,
          lng: item.lng,
        }
      })

      /**
       * category: Filter results by category.
       * image_type: Filter results by image type.
       * order: How the results should be ordered.
       * per_page: Determine the number of results per page.
       * @type {string}
       */
      const pixbayFilterParameters =
        '&category=travel&image_type=photo&order=popular&per_page=3'

      const filteredResponse = await Promise.all(
        filteredLocations.map(async (item) => {
          const res = await this.$axios.get(
            `?key=${this.$env.VUE_APP_PIXBAY_API_KEY}&q=${item.name}${pixbayFilterParameters}`,
            {
              baseURL: 'https://pixabay.com/api',
              timeout: 5000,
            }
          )

          return {
            ...item,
            // default have 3 images.
            imageUrl: res?.data?.hits?.shift()?.largeImageURL,
          }
        })
      )
      console.log(filteredResponse)

      commit('SET_SEARCH_LOADING', {}, { root: true })
    },
  },
}
