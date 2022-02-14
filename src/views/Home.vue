<template lang="pug">
div(class="home") testttttt
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Home',
  components: {},
  methods: {
    ...mapActions('Search', ['searchLocation']),
  },
  created() {
    this.searchLocation('istanbul')
  },
}
</script>
