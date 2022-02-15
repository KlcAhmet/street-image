<template lang="pug">
.header.py-12
  .grid.grid-cols-2
    .flex.flex-row.justify-end.flex-wrap
      input.shadow-lg.shadow-black.rounded-l-md.px-5(
        class="w-9/12"
        type="text"
        placeholder="Location"
        )
      button.header-button.shadow-lg.shadow-black.rounded-r-md.px-8.py-3(
        type="button"
        )
       | Search
    .flex.justify-end
      img(:src="HeaderLogo")
</template>

<script>
import HeaderLogo from '@/assets/svg/header-logo.svg'

export default {
  name: 'Header',
  data() {
    return {
      HeaderLogo,
    }
  },
}
</script>

<style scoped lang="sass">
.header
  &-button
    background-color: #1A2D3F
</style>
