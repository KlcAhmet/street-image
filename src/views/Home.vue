<template lang="pug">
.container(class="sm:px-2 md:px-20")
  .columns-1
    Header
</template>

<script>
//import { mapActions } from 'vuex'
import Header from '@/components/Header'
export default {
  name: 'Home',
  components: {
    Header,
  },
  methods: {
    //...mapActions('Search', ['searchLocation']),
  },
  created() {
    //this.searchLocation('istanbul')
  },
}
</script>
