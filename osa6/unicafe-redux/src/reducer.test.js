import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('ok is incremented', () => {
    const action = {
      type: 'OK'
    }

    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })

  test('bad is incremented', () => {
    const action = {
      type: 'BAD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })

  test('zero resets everything', () => {
    const action0 = {
      type: 'GOOD'
    }
    const action1 = {
      type: 'OK'
    }
    const action2 = {
      type: 'BAD'
    }
    const reset = {
      type: 'ZERO'
    }

    const state = initialState
    deepFreeze(state)

    const state1 = counterReducer(state, action0)
    const state2 = counterReducer(state1, action1)
    const state3 = counterReducer(state2, action2)

    expect(state3).toEqual({
      good: 1,
      ok: 1,
      bad: 1
    })

    const finalState = counterReducer(state3, reset)
    expect(finalState).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    })
  })
})