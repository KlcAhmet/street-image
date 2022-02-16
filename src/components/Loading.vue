<template lang="pug">
.bg-indigo-800.flex.justify-center(
  :class="fullWH ? 'fixed left-0 top-0 w-full h-full' : ''"
)
  .h-full.flex
    .my-auto.text-white.font-bold.text-2xl Yükleniyor

</template>

<script>
export default {
  props: {
    fullWH: {
      type: Boolean,
      default: true,
    },
  },
  name: 'Loading',
}
</script>

<style scoped></style>
