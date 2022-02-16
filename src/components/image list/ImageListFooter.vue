<template lang="pug">
.columns-1.pb-10.imagelistfooter
  .w-full.flex.flex-row.justify-center
    button.imagelistfooter-btn.bg-orange-600.text-white.rounded-lg.px-3.py-2.mr-1(
      @click="setPageNumber(false)"
      type="button"
      :disabled="pageNumber === 0"
      ) Geri
    button.imagelistfooter-btn.bg-indigo-800.text-white.rounded-lg.px-3.py-2.ml-1(
      @click="setPageNumber(true)"
      type="button"
      :disabled="pageNumber === filteredResults - 1"
      ) İleri
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  name: 'ImageListFooter',
  computed: {
    ...mapState('Search', ['pageNumber', 'filteredResults']),
  },
  methods: {
    ...mapMutations('Search', ['INCREASE_PAGE_NUMBER', 'DECREASE_PAGE_NUMBER']),
    ...mapActions('Search', ['nextSearchLocation']),
    setPageNumber(value) {
      if (value) this.INCREASE_PAGE_NUMBER()
      else this.DECREASE_PAGE_NUMBER()
      this.nextSearchLocation()
      window.scrollTo({ top: 0 })
    },
  },
  created() {},
}
</script>

<style lang="sass" scoped>
.imagelistfooter
  &-btn
    &:disabled
      opacity: .45
</style>
