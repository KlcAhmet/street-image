<template lang="pug">
div
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Home',
  methods: {
    ...mapActions(['routerPush']),
  },
  created() {
    this.routerPush('ImageSearch')
  },
}
</script>
