<template lang="pug">
.div(class="sm:px-2 md:px-20")
  .columns-1
    Header
  .columns-1
    ImageList
</template>

<script>
import Header from '@/components/Header'
import ImageList from '@/components/image list/ImageList'
export default {
  name: 'ImageSearch',
  components: {
    Header,
    ImageList,
  },
}
</script>
