// @flow
import {
  GET_DATA_REQUEST,
  GET_DATA_SUCCEEDED,
  GET_DATA_FAILED
} from '../actions/data/actionTypes'
import type {
  GetDataRequestAction,
  GetDataSucceededAction,
  GetDataFailedAction
} from '../actions/data'

export type State = {
  data:
    | {
        data: Array<Entry>,
        recordsFiltered: number,
        recordsTotal: number
      }
    | typeof undefined,
  isFetching: boolean
}

type Action =
  | GetDataRequestAction
  | GetDataSucceededAction
  | GetDataFailedAction

const initialState = {
  data: undefined,
  isFetching: false
}

const data = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case GET_DATA_REQUEST:
      return { ...state, isFetching: true }
    case GET_DATA_FAILED:
      return { ...state, isFetching: false }
    case GET_DATA_SUCCEEDED:
      return { ...state, data: action.data, isFetching: false }
    default:
      return state
  }
}

export default data
