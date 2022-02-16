<template lang="pug">
.header.py-12
  .flex.flex-wrap(
    class="flex-col-reverse justify-center md:justify-end md:flex-row"
    )
    .flex.flex-row.justify-center(class="w-11/12 md:w-8/12 lg:w-6/12 mx-auto sm:mx-0")
      input.shadow-lg.shadow-black.rounded-l-md.px-5(
        v-model.trim="searchLocation_"
        @keyup.enter="search"
        class="w-8/12"
        type="text"
        placeholder="Location"
        )
      button.header-button.text-white.shadow-lg.shadow-black.rounded-r-md.px-8.py-3(
        type="button"
        @click="search"
        :disabled="search_loading"
        ) Search
    .flex.justify-end(class="w-11/12 md:w-4/12 lg:w-3/12 pb-10 md:pb-0 sm:pr-10 md:pr-0")
      img(:src="HeaderLogo")
</template>

<script>
import HeaderLogo from '@/assets/svg/header-logo.svg'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Header',
  computed: {
    ...mapState('Search', ['search_loading']),
  },
  data() {
    return {
      HeaderLogo,
      searchLocation_: '',
    }
  },
  methods: {
    ...mapActions('Search', ['searchLocation']),
    search() {
      if (this.searchLocation_.length < 1) return
      this.searchLocation(this.searchLocation_.toLowerCase())
    },
  },
}
</script>

<style scoped lang="sass">
.header
  &-button
    &:disabled
      opacity: .10
    background-color: #1A2D3F
</style>
