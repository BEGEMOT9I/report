// @flow
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

import rootReducer from '../reducers'
import middlewares from './middleware'

export default function configureStore(
  initialState: Object | typeof undefined
) {
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
  )

  if (module.hot) {
    // $FlowIgnore
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default()
      // $FlowIgnore
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
