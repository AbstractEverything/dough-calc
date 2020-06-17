<template>
	<ul class="pt-4 mb-4 border-t border-dashed border-orange-300">
    <h3 class="text-lg font-bold">Ingredients:</h3>
    <ul>
      <li v-for="(item, index) in ingredients" :key="index">
        <span v-if="!empty(item)">
          {{ item.name }}: <span class="float-right"><strong>{{ item.value }}</strong><em>g</em> <span class="text-orange-500">({{ asPercent(item) }}%)</span></span>
        </span>
        <span v-if="empty(item)">&hellip;</span>
      </li>
    </ul>
  </ul>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import helpers from '../../helpers'

export default {
  methods: {
    empty(item) {
      return item.name == '' || item.value == '0' || item.value == ''
    },
    asPercent(item) {
      return this.round((item.value / this.totalWeight) * 100, 1)
    },
    round(value, decimals) {
      return helpers.round(value, decimals)
    },
  },
  computed: {
    ...mapState([
      'ingredients',
    ]),
    ...mapGetters([
      'totalWeight',
      'totalStarterDry',
      'totalStarterLiquid',
    ])
  }
}
</script>