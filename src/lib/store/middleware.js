// @flow
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { routerMiddleware } from 'react-router-redux'

import history from './history'

const middlewares = [thunk]

const router = routerMiddleware(history)
middlewares.push(router)

if (process.env.NODE_ENV === 'developement') {
  const logger = createLogger({
    collapsed: true
  })
  middlewares.push(logger)
}

export default middlewares
