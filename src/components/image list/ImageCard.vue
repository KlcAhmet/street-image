<template lang="pug">
.w-full
  .flex.flex-col
    img(
      class="w-full h-48"
      :src="imageSrc"
      )
    .text-center.pt-10 {{ name }}
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
