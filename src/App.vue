<template lang="pug">
div
  Loading(v-if="loading")
  router-view
</template>
<script>
import { mapState } from 'vuex'
import Loading from '@/components/Loading'

export default {
  name: 'App',
  components: {
    Loading,
  },
  computed: {
    ...mapState(['loading']),
  },
}
</script>
<style lang="scss"></style>
