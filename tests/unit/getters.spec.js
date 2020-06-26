import { getters } from '../../src/store/index.js'

test('"totalWeight" calculates total weight of all ingredients', () => {
  const state = {
    title: '',
    ingredients: [
        { id: 1233, name: 'test1', value: 20, type: 'dry', hydration: null },
        { id: 1464, name: 'test2', value: 30, type: 'liquid', hydration: null },
        { id: 2412, name: 'test3', value: 40, type: 'starter', hydration: 100 },
        { id: 4161, name: 'test4', value: 50, type: 'salt', hydration: null },
        { id: 4234, name: 'test5', value: 60, type: 'other', hydration: null },
    ],
  }
  const total = getters.totalWeight(state)
  expect(total).toBe(200)
})

test('"totalOfType" calculates total weight of all ingredients of a type', () => {
  const state = {
    title: '',
    ingredients: [
        { id: 1233, name: 'test1', value: 20, type: 'dry', hydration: null },
        { id: 1464, name: 'test2', value: 30, type: 'liquid', hydration: null },
        { id: 2412, name: 'test3', value: 40, type: 'starter', hydration: 100 },
        { id: 4161, name: 'test4', value: 50, type: 'salt', hydration: null },
        { id: 1466, name: 'test5', value: 30, type: 'dry', hydration: null },
        { id: 4234, name: 'test6', value: 60, type: 'other', hydration: null },
    ],
  }
  const total = getters.totalOfType(state)('dry')
  expect(total).toBe(50)
})

test('"totalOfType" returns zero when there are no ingredients of a type', () => {
  const state = {
    title: '',
    ingredients: [
        { id: 1464, name: 'test2', value: 30, type: 'liquid', hydration: null },
        { id: 2412, name: 'test3', value: 40, type: 'starter', hydration: 100 },
        { id: 4161, name: 'test4', value: 50, type: 'salt', hydration: null },
        { id: 4234, name: 'test6', value: 60, type: 'other', hydration: null },
    ],
  }
  const total = getters.totalOfType(state)('dry')
  expect(total).toBe(0)
})

// This method adds the wet and dry ingredients from the starter
// then adds them to the total wet and dry ingredients before calculating
// the final result.
// ((550 + 50) / (250 + 50) * 100) = 50%
test('"totalHydration" calculates the total hydration', () => {
  const state = {
    title: '',
    ingredients: [
        { id: 1233, name: 'test1', value: 550, type: 'dry', hydration: null },
        { id: 1464, name: 'test2', value: 250, type: 'liquid', hydration: null },
        { id: 2412, name: 'test3', value: 100, type: 'starter', hydration: 100 },
    ],
  }
  const totalOfType = jest.fn()
    .mockReturnValueOnce(250) // first call: total liquid
    .mockReturnValueOnce(550) // second call: total dry
  const totalStarterLiquid = 50
  const totalStarterDry = 50
  const mockedGetters = { totalOfType, totalStarterLiquid, totalStarterDry }
  const total = getters.totalHydration(state, mockedGetters)
  expect(total).toBe(50)
})

// Starter 1 (100g @ 100%): 100 / ((100/100) + 1) = 50
// Starter 2 (200g @ 60%): 200 / ((60/100) + 1) = 125
// Total dry ingredients in starters = 50 + 125 = 175
test('"totalStarterDry" calculates the total dry ingredients in the starter', () => {
  const state = {
    title: '',
    ingredients: [
        { id: 1233, name: 'test1', value: 550, type: 'dry', hydration: null },
        { id: 1464, name: 'test2', value: 250, type: 'liquid', hydration: null },
        { id: 2412, name: 'test3', value: 100, type: 'starter', hydration: 100 },
        { id: 2412, name: 'test3', value: 200, type: 'starter', hydration: 60 },
    ],
  }
  const total = getters.totalStarterDry(state)
  expect(total).toBe(175)
})

// Starter 1 (100g @ 100%): 100 - (100 / ((100 / 100) + 1) = 50
// Starter 2 (200g @ 60%): 200 - (200 / ((60 / 100) + 1) = 75
// Total wet ingredients in starters = 50 + 75 = 125
test('"totalStarterLiquid" calculates the total wet ingredients in the starter', () => {
  const state = {
    title: '',
    ingredients: [
        { id: 1233, name: 'test1', value: 550, type: 'dry', hydration: null },
        { id: 1464, name: 'test2', value: 250, type: 'liquid', hydration: null },
        { id: 2412, name: 'test3', value: 100, type: 'starter', hydration: 100 },
        { id: 2412, name: 'test3', value: 200, type: 'starter', hydration: 60 },
    ],
  }
  const total = getters.totalStarterLiquid(state)
  expect(total).toBe(125)
})

test('"totalStarterDry" returns zero when there are no starters', () => {
  const state = {
    title: '',
    ingredients: [
        { id: 1233, name: 'test1', value: 550, type: 'dry', hydration: null },
        { id: 1464, name: 'test2', value: 250, type: 'liquid', hydration: null },
    ],
  }
  const total = getters.totalStarterDry(state)
  expect(total).toBe(0)
})

test('"totalStarterLiquid" returns zero when there are no starters', () => {
  const state = {
    title: '',
    ingredients: [
        { id: 1233, name: 'test1', value: 550, type: 'dry', hydration: null },
        { id: 1464, name: 'test2', value: 250, type: 'liquid', hydration: null },
    ],
  }
  const total = getters.totalStarterLiquid(state)
  expect(total).toBe(0)
})

test('"stateToQuery" returns a query string based on the stores state with two items and a title', () => {
  const state = {
    title: 'test name',
    ingredients: [
        { id: 1233, name: 'test1', value: 20, type: 'dry', hydration: null },
        { id: 1464, name: 'test2', value: 30, type: 'liquid', hydration: null },
    ],
  }
  const one = 'name=test1&value=20&type=dry&hydration=null'
  const two = '&name=test2&value=30&type=liquid&hydration=null'
  const title = '&title=test%20name'
  const expectedStr = one + two + title
  const str = getters.stateToQuery(state)
  expect(str).toBe(expectedStr)
})

test('"stateToQuery" returns a query string based on the stores state with one item and a title', () => {
  const state = {
    title: 'test name',
    ingredients: [
        { id: 1233, name: 'test1', value: 20, type: 'dry', hydration: null },
    ],
  }
  const one = 'name=test1&value=20&type=dry&hydration=null'
  const title = '&title=test%20name'
  const expectedStr = one + title
  const str = getters.stateToQuery(state)
  expect(str).toBe(expectedStr)
})

test('"stateToQuery" returns a query string based on the stores state with only a title', () => {
  const state = {
    title: 'test name',
    ingredients: [],
  }
  const str = getters.stateToQuery(state)
  expect(str).toBe('title=test%20name')
})