<template>
	<li class="slide-fade-item bg-white shadow-md rounded px-4 lg:px-8 pt-8 pb-1 lg:pb-2 mb-4">
    <div class="mb-4 -mx-2 lg:-mx-6 -my-4 text-right">
      <button @click="moveUp(ingredient)" class="mr-2 focus:outline-none">
        <svg class="w-6 h-6 fill-current text-gray-400 hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 0a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm2 8v5H8v-5H5l5-5 5 5h-3z"/></svg>
      </button>
      <button @click="moveDown(ingredient)" class="mr-2 focus:outline-none">
        <svg class="w-6 h-6 fill-current text-gray-400 hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-2-8V5h4v5h3l-5 5-5-5h3z"/></svg>
      </button>
      <button @click="removeIngredient(ingredient)" class="mr-2 focus:outline-none">
        <svg class="w-6 h-6 fill-current text-gray-400 hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm1.41-1.41A8 8 0 1 0 15.66 4.34 8 8 0 0 0 4.34 15.66zm9.9-8.49L11.41 10l2.83 2.83-1.41 1.41L10 11.41l-2.83 2.83-1.41-1.41L8.59 10 5.76 7.17l1.41-1.41L10 8.59l2.83-2.83 1.41 1.41z"/></svg>
      </button>
    </div>
    <div class="-mt-8">
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label for="name" class="form-label text-gray-800">Name:</label>
          <input 
            v-model="newIngredient.name"
            @change="updateIngredient({ old: ingredient, new: newIngredient })"
            type="text" name="name"
            placeholder="E.g. flour or water..."
            autocomplete="off"
            class="form-input form-input-default"
          >
        </div>
        <div>
          <label for="value" class="form-label text-gray-800">Weight (g):</label>
          <input
            v-model.number="newIngredient.value"
            @change="updateIngredient({ old: ingredient, new: newIngredient })"
            type="number" name="value"
            placeholder="0"
            class="form-input form-input-default">
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label for="value" class="form-label text-gray-800">Type:</label>
          <div class="inline-block relative w-full">
            <select v-model="newIngredient.type" class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8  focus:outline-none">
              <option value="dry">Dry</option>
              <option value="liquid">Liquid</option>
              <option value="starter">Starter</option>
              <option value="salt">Salt</option>
              <option value="other">Other</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>
        <div v-if="newIngredient.type == 'starter'">
          <label for="hydration" class="form-label text-gray-800">Hydration (%):</label>
          <input v-model="newIngredient.hydration" type="number" min="0" name="hydration" class="form-input form-input-default">
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    ingredient: {
      type: Object,
      required: false,
    }
  },
  data() {
    return {
      newIngredient: {
        id: this.ingredient.id,
        name: this.ingredient.name,
        value: this.ingredient.value || 0,
        type: this.ingredient.type,
        hydration: this.ingredient.hydration || 0
      },
    }
  },
  methods: {
    ...mapActions([
      'updateIngredient',
      'removeIngredient',
      'moveUp',
      'moveDown',
    ]),
  },
}
</script>

<style>
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.2s;
}
.slide-fade-enter, .slide-fade-leave-to {
  opacity: 0;
}
.slide-fade-item {
  transition: all 0.2s;
}
.slide-fade-enter, .slide-fade-leave-to {
  opacity: 0;
}
.slide-fade-leave-active {
  position: absolute;
}
</style>