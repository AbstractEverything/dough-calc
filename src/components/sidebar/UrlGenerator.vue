<template>
  <div>
    <label for="target-weight" class="form-label">Url:</label>
      <input
        :value="makeUrl()"
        @focus="$event.target.select()"
        name="url"
        class="form-input form-input-copy">
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  methods: {
    makeUrl() {
      return process.env.VUE_APP_BASE_URL + '?' + this.stateToQuery
    }
  },
  computed: {
    ...mapGetters([
      'stateToQuery',
    ])
  }
}
</script>