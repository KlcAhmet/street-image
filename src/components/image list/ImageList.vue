<template lang="pug">
.columns-1
  .grid.grid-cols-4.gap-x-5.gap-y-3
    ImageCard
    ImageCard
    ImageCard
    ImageCard
    ImageCard
    ImageCard
    ImageCard
    ImageCard
</template>

<script>
import ImageCard from '@/components/image list/ImageCard'
export default {
  name: 'ImageList',
  components: {
    ImageCard,
  },
}
</script>

<style scoped></style>
