<template lang="pug">
.container(class="sm:px-2 md:px-20")
  .columns-1
    Header
  .columns-1
    ImageList
</template>

<script>
//import { mapActions } from 'vuex'
import Header from '@/components/Header'
import ImageList from '@/components/image list/ImageList'
export default {
  name: 'Home',
  components: {
    Header,
    ImageList,
  },
  methods: {
    //...mapActions('Search', ['searchLocation']),
  },
  created() {
    //this.searchLocation('istanbul')
  },
}
</script>
