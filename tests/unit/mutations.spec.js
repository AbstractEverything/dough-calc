import { mutations } from '../../src/store/index.js'

test('It sets the title', () => {
  const state = {
    title: '',
    ingredients: [],
  }
  mutations.updateTitle(state, 'test123')
  expect(state.title).toBe('test123')
})

test('"addIngredient" adds one ingredient', () => {
  const state = {
    title: '',
    ingredients: [],
  }
  mutations.addIngredient(state, {
    id: 123,
    name: 'test',
    value: 10,
    type: 'dry',
    hydration: null,
  })
  expect(state.ingredients.length).toBe(1)
  expect(state.ingredients[0]).toEqual({
    id: 123,
    name: 'test',
    value: 10,
    type: 'dry',
    hydration: null,
  })
})

test('"updateIngredient" updates an ingredient', () => {
  const state = {
    title: '',
    ingredients: [
      {
        id: 142,
        name: 'test',
        value: 20,
        type: 'starter',
        hydration: 100,
      },
      {
        id: 123,
        name: 'test',
        value: 10,
        type: 'dry',
        hydration: null,
      }
    ]
  }
  const payload = {
    old: state.ingredients[0],
    new: {
      id: 144,
      name: 'updated',
      value: 10,
      type: 'salt',
      hydration: null,
    }
  }
  mutations.updateIngredient(state, payload)
  expect(state.ingredients.length).toBe(2)
  expect(state.ingredients[0]).toEqual({
    id: 144,
    name: 'updated',
    value: 10,
    type: 'salt',
    hydration: null,
  })
})

test('It removes an ingredient', () => {
  const state = {
    title: '',
    ingredients: [
      {
        id: 123,
        name: 'test',
        value: 10,
        type: 'dry',
        hydration: null,
      }
    ]
  }
  mutations.removeIngredient(state, state.ingredients[0])
  expect(state.ingredients.length).toBe(0)
})

test('It adjusts weights', () => {
  const state = {
    title: '',
    ingredients: [
      {
        id: 123,
        name: 'test',
        value: 10,
        type: 'dry',
        hydration: null,
      },
      {
        id: 142,
        name: 'test',
        value: 20,
        type: 'starter',
        hydration: 100,
      }
    ]
  }
  mutations.adjustWeights(state, {
    newWeight: 90,
    oldWeight: 30, 
  })
  expect(state.ingredients[0].value).toBe(30)
  expect(state.ingredients[1].value).toBe(60)
})

test('It does not attempt to move top ingredient up', () => {
  const state = {
    title: '',
    ingredients: [
      {
        id: 123,
        name: 'test1',
        value: 10,
        type: 'dry',
        hydration: null,
      },
      {
        id: 142,
        name: 'test2',
        value: 20,
        type: 'starter',
        hydration: 100,
      }
    ]
  }
  mutations.moveUp(state, state.ingredients[0])
  expect(state.ingredients.length).toBe(2)
  expect(state.ingredients[0]).toEqual({
    id: 123,
    name: 'test1',
    value: 10,
    type: 'dry',
    hydration: null,
  })
})

test('It does not attempt to move bottom ingredient down', () => {
  const state = {
    title: '',
    ingredients: [
      {
        id: 123,
        name: 'test1',
        value: 10,
        type: 'dry',
        hydration: null,
      },
      {
        id: 142,
        name: 'test2',
        value: 20,
        type: 'starter',
        hydration: 100,
      }
    ]
  }
  mutations.moveDown(state, state.ingredients[1])
  expect(state.ingredients.length).toBe(2)
  expect(state.ingredients[1]).toEqual({
    id: 142,
    name: 'test2',
    value: 20,
    type: 'starter',
    hydration: 100,
  })
})

test('It swaps down', () => {
  const state = {
    title: '',
    ingredients: [
      {
        id: 123,
        name: 'test1',
        value: 10,
        type: 'dry',
        hydration: null,
      },
      {
        id: 142,
        name: 'test2',
        value: 20,
        type: 'starter',
        hydration: 100,
      }
    ]
  }
  mutations.moveDown(state, state.ingredients[0])
  expect(state.ingredients.length).toBe(2)
  expect(state.ingredients[0]).toEqual({
    id: 142,
    name: 'test2',
    value: 20,
    type: 'starter',
    hydration: 100,
  })
  expect(state.ingredients[1]).toEqual({
    id: 123,
    name: 'test1',
    value: 10,
    type: 'dry',
    hydration: null,
  })
})

test('It swaps up', () => {
  const state = {
    title: '',
    ingredients: [
      {
        id: 123,
        name: 'test1',
        value: 10,
        type: 'dry',
        hydration: null,
      },
      {
        id: 142,
        name: 'test2',
        value: 20,
        type: 'starter',
        hydration: 100,
      }
    ]
  }
  mutations.moveUp(state, state.ingredients[1])
  expect(state.ingredients.length).toBe(2)
  expect(state.ingredients[0]).toEqual({
    id: 142,
    name: 'test2',
    value: 20,
    type: 'starter',
    hydration: 100,
  })
  expect(state.ingredients[1]).toEqual({
    id: 123,
    name: 'test1',
    value: 10,
    type: 'dry',
    hydration: null,
  })
})