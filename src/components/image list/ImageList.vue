<template lang="pug">
.columns-1
  .w-full.text-center.font-weight-bold(
    v-if="!getResultByPageNumber.length"
    ) Arama Sonucu Yok
  .grid.gap-x-5.gap-y-3(
    v-else
    class="sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-4 md:p-0"
    )
    ImageCard(
      v-for="(item, index) in getResultByPageNumber"
      :key="index"
      :name="item.name"
      :imageSrc="item.imageUrl ?? defaultImageSrc"
      @click="imageDetail(item)"
      )
  ImageListFooter(v-if="getResultByPageNumber.length")
</template>

<script>
import ImageCard from '@/components/image list/ImageCard'
import ImageListFooter from '@/components/image list/ImageListFooter'
import defaultImageSrc from '@/assets/images/default-image.png'
import { mapMutations, mapGetters, mapActions } from 'vuex'
export default {
  name: 'ImageList',
  components: {
    ImageCard,
    ImageListFooter,
  },
  computed: {
    ...mapGetters('Search', ['getResultByPageNumber']),
  },
  methods: {
    ...mapMutations(['SET_SELECTED_IMAGES']),
    ...mapActions(['routerPush']),
    async imageDetail(item) {
      const obj = JSON.parse(JSON.stringify(item))
      this.SET_SELECTED_IMAGES(obj)
      this.routerPush('ImageDetail')
    },
  },
  data() {
    return {
      defaultImageSrc,
    }
  },
}
</script>

<style scoped></style>
