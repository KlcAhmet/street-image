<template lang="pug">
div
  Loading(v-if="search_loading")
  .imageDetail.h-screen(v-if="!search_loading && oneResult")
    img.imageDetail-header.absolute.top-12.right-12.z-0(
      :src="HeaderLogo"
    )
    button.imageDetail-backbtn.bg-white.absolute.top-10.left-12.p-3.rounded-full.z-10(
      type="button"
      @click="backPage()"
      )
      img(:src="ArrowBack")
    img(
      class="h-1/2 w-full"
      :src="oneResult.imageUrl ?? DefaultImage"
      )
    .flex.justify-center.pt-10
      div.rounded-xl.shadow-xl.p-8(
        class="w-9/12 sm:w-5/12 md:w-4/12 lg:w-3/12"
        )
        .imageDetail-text-color.pb-4.text-lg.font-medium {{oneResult.name}}
        .grid.grid-cols-2.grid-rows-4.imageDetail-text-color
          label Population
          label.font-light {{oneResult.population}}
          label Temperature
          label.font-light {{oneResult.temperature}} &#8451;
          label Lat
          label.font-light {{oneResult.lat}}
          label Lng
          label.font-light {{oneResult.lng}}
</template>

<script>
import { mapActions, mapState } from 'vuex'
import DefaultImage from '@/assets/images/default-image.png'
import HeaderLogo from '@/assets/svg/header-logo.svg'
import ArrowBack from '@/assets/svg/arrow-back.svg'
import Loading from '@/components/Loading'

export default {
  name: 'Slug',
  components: {
    Loading,
  },
  computed: {
    ...mapState('Search', ['search_loading', 'oneResult']),
  },
  methods: {
    ...mapActions('Search', ['searchOneLocation']),
    findLocation() {
      const routerPath = this.$router.currentRoute._value.params.isim
      this.searchOneLocation(routerPath)
    },
  },
  watch: {
    $route(to, from) {
      if (to !== from) {
        this.findLocation()
      }
    },
  },
  data() {
    return {
      DefaultImage,
      HeaderLogo,
      ArrowBack,
    }
  },
  created() {
    this.findLocation()
  },
}
</script>

<style scoped></style>
