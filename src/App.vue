<template>
  <div id="app" class="bg-orange-100 font-body min-h-screen overflow-hidden">
    <div class="container mx-auto mt-8 mb-8">
      <div class="grid md:grid-cols-1 lg:grid-cols-3 gap-8 mr-4 ml-4 lg:mr-8 lg:ml-8">
        <main-header/>
        <editable-list/>
        <main-sidebar/>
      </div>
    </div>
  </div>
</template>

<script>
import MainHeader from './components/MainHeader.vue'
import MainSidebar from './components/MainSidebar.vue'
import EditableList from './components/EditableList.vue'

export default {
  name: 'App',
  components: {
    MainHeader,
    MainSidebar,
    EditableList,
  },
  mounted() {
    this.hydrateStore()
  },
  methods: {
    hydrateStore() {
      (this.$route.query.title == undefined)
        ? this.$store.dispatch('updateTitle', 'Enter recipe title...')
        : this.$store.dispatch('updateTitle', this.$route.query.title)
      if (this.$route.query.name == undefined)
        return
      if (Array.isArray(this.$route.query.name)) {
        const reversed = this.reversedQuery()
        reversed.name.forEach((item, index) => {
          this.$store.dispatch('addIngredient', {
            name: item,
            value: parseFloat(reversed.value[index]),
            type: reversed.type[index],
            hydration: parseFloat(reversed.hydration[index]),
          })
        })
      } else {
        this.$store.dispatch('addIngredient', {
          name: this.$route.query.name,
          value: parseFloat(this.$route.query.value),
          type: this.$route.query.type,
          hydration: parseFloat(this.$route.query.hydration),
        })
      }
    },
    reversedQuery() {
      return {
        name: this.$route.query.name.reverse(),
        value: this.$route.query.value.reverse(),
        type: this.$route.query.type.reverse(),
        hydration: this.$route.query.hydration.reverse(),
      }
    }
  }
}
</script>