<template lang="pug">
.w-full.py-2
  .flex.flex-col
    img(
      class="w-full h-48"
      :src="imageSrc"
      )
    .text-center.font-medium(class="pt-5") {{ name }}
</template>

<script>
export default {
  props: {
    name: String,
    imageSrc: String,
  },
  name: 'ImageCard',
}
</script>

<style scoped></style>
