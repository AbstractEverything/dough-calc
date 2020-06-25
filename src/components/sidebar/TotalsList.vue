<template>
  <div class="pt-4 mb-4 border-t border-dashed border-orange-300">
    <h3 class="text-lg font-bold">Totals:</h3>
    <ul class="mb-4">
      <li>Dry: <span class="float-right"><strong>{{ totalOfType('dry') }}</strong><em>g</em></span></li>
      <li>Dry (inc. preferment): <span class="float-right"><strong>{{ totalOverallDry }}</strong><em>g</em></span></li>
      <li>Liquid: <span class="float-right"><strong>{{ totalOfType('liquid') }}</strong><em>g</em></span></li>
      <li>Starter: <span class="float-right"><strong>{{ totalOfType('starter') }}</strong><em>g</em></span></li>
      <li>Salt: <span class="float-right"><strong>{{ totalOfType('salt') }}</strong><em>g</em></span></li>
      <li>Other: <span class="float-right"><strong>{{ totalOfType('other') }}</strong><em>g</em></span></li>
    </ul>
    <ul class="pt-2 border-t border-dashed border-orange-300">
      <li>Total: <span class="float-right"><strong>{{ totalWeight }}</strong><em>g</em></span></li>
      <li v-if="!isNaN(totalHydration)">Hydration: <span :class="{ 'text-red-600': hydrationWarning(), 'text-green-600': ! hydrationWarning() }" class="float-right"><strong>{{ totalHydration }}</strong>%</span></li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  methods: {
    totalOfType(type) {
      return this.$store.getters.totalOfType(type)
    },
    hydrationWarning() {
      return this.totalHydration < 60 || this.totalHydration > 80
    }
  },
  computed: {
    ...mapGetters([
      'totalWeight',
      'totalHydration',
      'totalOverallDry',
    ])
  }
}
</script>