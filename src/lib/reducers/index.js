// @flow
import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

import data from './data'

export default combineReducers({
  router,
  data
})
