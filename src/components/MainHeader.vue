<template>
  <div class="lg:col-span-3 text-orange-900">
    <input v-model="title" type="text" class="w-full text-2xl bg-transparent font-bold hover:border-b-2 focus:outline-none" placeholder="My recipe title...">
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    title: {
      get() {
        return this.$store.state.title
      },
      set(value) {
        this.$store.commit('updateTitle', value)
      }
    }
  }
}
</script>
