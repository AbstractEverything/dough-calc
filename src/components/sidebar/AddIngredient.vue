<template>
  <div>
    <button
        @click="addIngredient(blank())"
        class="btn btn-orange block rounded-full w-full mb-4 pt-4 pb-4 border border-orange-500 transition duration-300 ease-in-out"
      >Add</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import helpers from '../../helpers'

export default {
  methods: {
    ...mapActions([
      'addIngredient',
    ]),
    blank() {
      return {
        id: helpers.randomInt(),
        name: '',
        value: 0,
        type: 'dry',
        hydration: null,
      }
    }
  }
}
</script>