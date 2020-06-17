<template>
  <div class="lg:col-span-1 text-orange-900">
    <ingredient-list/>
    <totals-list/>
    <bakers-percentages-list/>
    <target-weight/>
    <url-generator/>
  </div>
</template>

<script>
import IngredientList from './sidebar/IngredientList.vue'
import TotalsList from './sidebar/TotalsList.vue'
import BakersPercentagesList from './sidebar/BakersPercentagesList.vue'
import TargetWeight from './sidebar/TargetWeight.vue'
import UrlGenerator from './sidebar/UrlGenerator.vue'

export default {
  name: 'App',
  components: {
    IngredientList,
    TotalsList,
    BakersPercentagesList,
    TargetWeight,
    UrlGenerator,
  }
}
</script>
