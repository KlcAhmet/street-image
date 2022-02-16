<template lang="pug">
.header.py-12
  .flex.flex-wrap(
    class="flex-col-reverse justify-center md:justify-end md:flex-row"
    )
    .flex.flex-row.justify-center(class="w-11/12 md:w-8/12 lg:w-6/12 ")
      input.shadow-lg.shadow-black.rounded-l-md.px-5(
        class="w-8/12"
        type="text"
        placeholder="Location"
        )
      button.header-button.shadow-lg.shadow-black.rounded-r-md.px-8.py-3(
        type="button"
        )
       | Search
    .flex.justify-end(class="w-11/12 md:w-4/12 lg:w-3/12 pb-10 md:pb-0 sm:pr-10 md:pr-0")
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
