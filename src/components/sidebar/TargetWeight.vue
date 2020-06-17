<template>
  <div class="pt-4 mb-4 border-t border-dashed border-orange-300">
    <label for="target-weight" class="form-label">Target weight:</label>
    <p>
      <input
        v-model="target"
        @keyup.enter="adjustWeights()"
        type="text"
        class="form-input form-input-orange"
      >
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      target: '',
    }
  },
  methods: {
    adjustWeights() {
      if (this.target == '' || this.target < 1) return
      this.$store.dispatch('adjustWeights', {
        newWeight: parseFloat(this.target),
        oldWeight: this.totalWeight,
      })
    }
  },
  computed: {
    ...mapGetters([
      'totalWeight',
    ])
  }
}
</script>