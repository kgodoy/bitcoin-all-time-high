import cond from 'ramda/src/cond'
import T from 'ramda/src/T'
import always from 'ramda/src/always'
import merge from 'ramda/src/merge'
import propEq from 'ramda/src/propEq'
import { createStore } from 'redux'

const isAllTimeHigh = store => event =>
  +event.trade.price > +store.getState().high

const SET_HIGH = propEq('type', 'SET_HIGH')

const init = {
  high: '0',
}

const reducers = (store = init, action) => cond([
  [SET_HIGH, ({ high }) => merge(store, { high })],
  [T, always(store)],
])(action)

export default () => {
  const store = createStore(reducers)

  return merge(
    store,
    { isAllTimeHigh: isAllTimeHigh(store) }
  )
}
