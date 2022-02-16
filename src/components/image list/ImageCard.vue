<template lang="pug">
.w-full
  .flex.flex-col
    img(:src="imageSrc")
    .text-center {{ name }}
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
