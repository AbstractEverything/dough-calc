<template>
  <div class="pt-4 mb-4 border-t border-dashed border-orange-300">
    <h3 class="text-lg font-bold">Bakers %:</h3>
    <div v-if="totalOfType('dry') > 0">
      <ul>
        <li v-for="item in allOfTypeNot('dry')" :key="item.name">
          {{ item.name }}:<span class="float-right"><strong>{{ round((item.value / totalOfType('dry')) * 100, 1) }}</strong><em>%</em></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import helpers from '../../helpers'

export default {
  methods: {
    totalOfType(type) {
      return this.$store.getters.totalOfType(type)
    },
    allOfTypeNot(type) {
      return this.$store.getters.allOfTypeNot(type)
    },
    round(value, decimals) {
      return helpers.round(value, decimals)
    }
  }
}
</script>