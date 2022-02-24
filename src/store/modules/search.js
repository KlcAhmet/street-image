/**
 * lang: Language code of the language to be searched in.
 * image_type: Filter results by image type.
 * order: How the results should be ordered.
 * per_page: Determine the number of results per page.
 * @type {string}
 */
const pixbayFilterParameters = '&image_type=photo&order=popular&per_page=3'
/**
 * units: Units of measurement. standard, metric and imperial units,
 *        are available. If you do not use the units parameter, ,standard
 *        units will be applied by default.
 * appid: Your unique API key
 * more info: https://openweathermap.org/current
 * @type {string}
 */
const openWeatherFilterParameters = '&units=metric&appid='

export default {
  namespaced: true,

  state: () => ({
    pageNumber: 0,
    search_loading: false,
    searchResults: [],
    filteredResults: [],
    info: 'Arama bekleniyor',
    oneResult: null,
  }),

  getters: {
    getResultMaxPage(state) {
      const obj = JSON.parse(JSON.stringify(state.searchResults))
      return Math.ceil(obj.length / 100)
    },
  },

  mutations: {
    SET_SEARCH_LOADING: (state) =>
      (state.search_loading = !state.search_loading),
    SET_SEARCH_RESULTS: (state, payload) => (state.searchResults = payload),
    INCREASE_PAGE_NUMBER: (state) => (state.pageNumber = state.pageNumber + 1),
    DECREASE_PAGE_NUMBER: (state) => (state.pageNumber = state.pageNumber - 1),
    SET_INFO: (state, payload) => (state.info = payload),
    SET_FILTERED_RESULTS: (state, payload) => (state.filteredResults = payload),
    SET_ONERESULT: (state, payload) => (state.oneResult = payload),
  },

  actions: {
    async searchLocation({ commit }, searchLocations) {
      commit('SET_SEARCH_LOADING')
      commit('SET_SEARCH_RESULTS', [])
      commit('SET_INFO', 'Arama yapılıyor...')
      try {
        /**
         * q: location name
         * username: api access key
         * maxRows:the maximal number of rows in the document returned by the service.
         *         Default is 100, the maximal allowed value is 1000.
         * more info: https://www.geonames.org/export/geonames-search.html
         * @type {string}
         */
        const locations = await this.$axios.get(
          `searchJSON?q=${searchLocations}&maxRows=1000&username=${this.$env.VUE_APP_GEO_NAMES_USER}`,
          {
            baseURL: 'http://api.geonames.org',
            timeout: 5000,
          }
        )

        if (!locations.data.geonames.length)
          commit('SET_INFO', 'Lokasyon bulunamadı')

        const filteredLocations = locations.data.geonames.map((item) => {
          return {
            name: item.toponymName,
            population: item.population,
            lat: item.lat,
            lng: item.lng,
            //countryCode: item.countryCode.toLowerCase() ?? '',
          }
        })

        const filteredImages = await Promise.all(
          filteredLocations.map(async (item, index) => {
            if (index > 100)
              return {
                ...item,
                imageUrl: null,
              }
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

        const filteredWeather = await Promise.all(
          filteredImages.map(async (item, index) => {
            if (index > 100)
              return {
                ...item,
                temperature: '22',
              }
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
        )

        const filteredArray = filteredWeather.slice(0, 100)

        commit('SET_SEARCH_RESULTS', filteredWeather)
        commit('SET_FILTERED_RESULTS', filteredArray)
      } catch (e) {
        console.log(e)
        commit('SET_INFO', 'Anlaşılamayan bir sorun oluştu :(')
      } finally {
        commit('SET_SEARCH_LOADING')
      }
    },
    async searchOneLocation({ commit }, searchLocations) {
      commit('SET_SEARCH_LOADING')
      commit('SET_ONERESULT', null)
      try {
        /**
         * q: location name
         * username: api access key
         * maxRows:the maximal number of rows in the document returned by the service.
         *         Default is 100, the maximal allowed value is 1000.
         * more info: https://www.geonames.org/export/geonames-search.html
         * @type {string}
         */
        const locations = await this.$axios.get(
          `searchJSON?q=${searchLocations}&maxRows=1&username=${this.$env.VUE_APP_GEO_NAMES_USER}`,
          {
            baseURL: 'http://api.geonames.org',
            timeout: 5000,
          }
        )

        if (!locations.data.geonames.length)
          commit('SET_INFO', 'Lokasyon bulunamadı') // todo ana sayfaya

        const geonamesData = locations.data.geonames[0]
        const filteredLocation = {
          name: geonamesData.toponymName,
          population: geonamesData.population,
          lat: geonamesData.lat,
          lng: geonamesData.lng,
        }

        const imageData = await this.$axios.get(
          `?key=${this.$env.VUE_APP_PIXBAY_API_KEY}&q=${filteredLocation.name}${pixbayFilterParameters}`,
          {
            baseURL: 'https://pixabay.com/api',
            timeout: 5000,
          }
        )

        const filteredImageData = {
          ...filteredLocation,
          imageUrl: imageData?.data?.hits?.shift()?.largeImageURL,
        }

        const weatherData = await this.$axios.get(
          `weather?lat=${filteredImageData.lat}&lon=${filteredImageData.lng}${openWeatherFilterParameters}${this.$env.VUE_APP_OPEN_WEATHER_API_KEY}`,
          {
            baseURL: 'https://api.openweathermap.org/data/2.5',
            timeout: 5000,
          }
        )

        const filteredWeatherData = {
          ...filteredImageData,
          temperature: weatherData?.data?.main?.feels_like,
        }
        console.log(22);
        commit('SET_ONERESULT', filteredWeatherData)
      } catch (e) {
        console.log(e)
      } finally {
        commit('SET_SEARCH_LOADING')
      }
    },
    async nextSearchLocation({ state, commit }) {
      try {
        commit('SET_SEARCH_LOADING')
        commit('SET_FILTERED_RESULTS', [])
        commit('SET_INFO', 'Arama yapılıyor...')
        const arrayStartIndex = state.pageNumber * 100
        const arrayEndIndex = arrayStartIndex + 100

        const filteredArray = state.searchResults.slice(
          arrayStartIndex,
          arrayEndIndex
        )

        const filteredImages = await Promise.all(
          filteredArray.map(async (item, index) => {
            if (index > 100)
              return {
                ...item,
                imageUrl: null,
              }
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

        const filteredWeather = await Promise.all(
          filteredImages.map(async (item, index) => {
            if (index > 100)
              return {
                ...item,
                temperature: '22',
              }
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
        )

        const filteredWeatherArray = filteredWeather.slice(0, 100)

        commit('SET_FILTERED_RESULTS', filteredWeatherArray)
      } catch (e) {
        console.log(e)
        commit('SET_INFO', 'Anlaşılamayan bir sorun oluştu :(')
        commit('SET_FILTERED_RESULTS', [])
      } finally {
        commit('SET_SEARCH_LOADING')
      }
    },
  },
}
