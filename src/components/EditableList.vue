<template>
  <div class="lg:col-span-2">
    <add-ingredient/>
    <transition-group tag="ul" name="slide-fade" @before-leave="beforeLeave">
      <editable-list-item
        v-for="item in ingredients"
        :ingredient="item"
        :key="item.id"
      />
    </transition-group>
  </div>
</template>

<script>
import AddIngredient from './sidebar/AddIngredient.vue'
import EditableListItem from './EditableListItem.vue'
import { mapState } from 'vuex'

export default {
  components: {
    AddIngredient,
    EditableListItem,
  },
  methods: {
    /**
     * Fix animation glitch caused by absolute positioning applied to -leave-active
     * See: https://forum.vuejs.org/t/transition-group-leave-transition-w-position-absolute-jumping-to-top-left-flip/12258/3
     */
    beforeLeave(el) {
      const {marginLeft, marginTop, width, height} = window.getComputedStyle(el)
      el.style.left = `${el.offsetLeft - parseFloat(marginLeft, 10)}px`
      el.style.top = `${el.offsetTop - parseFloat(marginTop, 10)}px`
      el.style.width = width
      el.style.height = height
    }
  },
  computed: {
    ...mapState([
      'ingredients',
    ]),
  }
}
</script>