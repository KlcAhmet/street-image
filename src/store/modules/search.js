export default {
  namespaced: true,

  state: () => ({
    search_loading: false,
    searchResults: [],
  }),

  getters: {},

  mutations: {
    SET_SEARCH_LOADING: (state) =>
      (state.search_loading = !state.search_loading),
    SET_SEARCH_RESULTS: (state, payload) => (state.searchResults = payload),
  },

  actions: {
    async searchLocation({ commit }, searchLocations) {
      commit('SET_SEARCH_LOADING')

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
          countryCode: item.countryCode.toLowerCase(),
        }
      })

      /**
       * lang: Language code of the language to be searched in.
       * image_type: Filter results by image type.
       * order: How the results should be ordered.
       * per_page: Determine the number of results per page.
       * @type {string}
       */
      const pixbayFilterParameters =
        '&image_type=photo&order=popular&per_page=3'

      const filteredImages = await Promise.all(
        filteredLocations.map(async (item) => {
          const res = await this.$axios.get(
            `?key=${this.$env.VUE_APP_PIXBAY_API_KEY}&q=${item.name}&lang=${item.countryCode}${pixbayFilterParameters}`,
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

      /**
       * units: Units of measurement. standard, metric and imperial units,
       *        are available. If you do not use the units parameter, ,standard
       *        units will be applied by default.
       * appid: Your unique API key
       * more info: https://openweathermap.org/current
       * @type {string}
       */
      /*const openWeatherFilterParameters = '&units=metric&appid='

      const filteredWeather = await Promise.all(
        filteredImages.map(async (item) => {
          const res = await this.$axios.get(
            `weather?lat=${item.lat}&lon=${item.lng}${openWeatherFilterParameters}${this.$env.VUE_APP_OPEN_WEATHER_API_KEY}`,
            {
              baseURL: 'https://api.openweathermap.org/data/2.5',
              timeout: 5000,
            }
          )

          return {
            ...item,
            temperature: res?.data?.main?.feels_like,
          }
        })
      )*/
      const filteredWeather = filteredImages.map((item) => {
        return {
          ...item,
          temperature: '22',
        }
      })

      commit('SET_SEARCH_RESULTS', filteredWeather)
      commit('SET_SEARCH_LOADING')
    },
  },
}
