<template lang="pug">
.imageDetail.h-screen
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
    :src="selectedImages.imageUrl ?? DefaultImage"
    )
  .flex.justify-center.pt-10
    div.rounded-xl.shadow-xl.p-8(
      class="w-9/12 sm:w-5/12 md:w-4/12 lg:w-3/12"
      )
      .imageDetail-text-color.pb-4.text-lg.font-medium {{selectedImages.name}}
      .grid.grid-cols-2.grid-rows-4.imageDetail-text-color
        label Population
        label.font-light {{selectedImages.population}}
        label Temperature
        label.font-light {{selectedImages.temperature}} &#8451;
        label Lat
        label.font-light {{selectedImages.lat}}
        label Lng
        label.font-light {{selectedImages.lng}}
</template>

<script>
import { mapActions, mapState } from 'vuex'
import DefaultImage from '@/assets/images/default-image.png'
import HeaderLogo from '@/assets/svg/header-logo.svg'
import ArrowBack from '@/assets/svg/arrow-back.svg'

export default {
  name: 'ImageDetail',
  computed: {
    ...mapState(['selectedImages']),
  },
  data() {
    return {
      DefaultImage,
      HeaderLogo,
      ArrowBack,
    }
  },
  methods: {
    ...mapActions(['routerGo']),
    backPage() {
      this.routerGo(-1)
    },
  },
}
</script>

<style lang="sass" scoped>
.imageDetail
  &-backbtn
    &:hover
      background-color: #701a75
  &-text-color
    color: #1A2D3F
@media screen and (max-width: 600px)
  .imageDetail-header
    top: 2em
    right: 2em
  .imageDetail-backbtn
    top: 1.7em
    left: 2em
</style>
