<template lang="pug">
.w-full.py-2
  .flex.flex-col
    img(
      v-show="show"
      class="w-full h-48"
      :src="imageSrc"
      @load="imageloaded"
      )
    img(
      v-show="!show"
      class="w-full h-48"
      :src="LoadingImage"
      @load="imageloaded"
      )
    .text-center.font-medium(class="pt-5") {{ name }}
</template>

<script>
import LoadingImage from '@/assets/images/loading-image.png'
export default {
  props: {
    name: String,
    imageSrc: String,
  },
  name: 'ImageCard',
  data() {
    return {
      LoadingImage,
      show: false,
    }
  },
  methods: {
    imageloaded() {
      this.show = true
    },
  },
}
</script>

<style scoped></style>
