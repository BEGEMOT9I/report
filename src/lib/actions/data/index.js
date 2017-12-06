// @flow
import {
  GET_DATA_REQUEST,
  GET_DATA_SUCCEEDED,
  GET_DATA_FAILED
} from './actionTypes'
import fetchApi from '../../fetchApi'

export type GetDataRequestAction = {
  type: typeof GET_DATA_REQUEST
}

export type GetDataSucceededAction = {
  type: typeof GET_DATA_SUCCEEDED,
  data: Object
}

export type GetDataFailedAction = {
  type: typeof GET_DATA_FAILED
}

export function getData(): ThunkAction {
  return dispatch => {
    dispatch({ type: GET_DATA_REQUEST })
    fetchApi({
      url: 'http://backoffice.aviasales.ru',
      path: '/api/statistics',
      params: [
        {
          key: 'from',
          value: '2017-10-27'
        },
        {
          key: 'to',
          value: '2017-11-02'
        },
        {
          key: 'interval',
          value: '1h'
        }
      ]
    })
      .then(data => dispatch({ type: GET_DATA_SUCCEEDED, data }))
      .catch(error => {
        dispatch({ type: GET_DATA_FAILED })
        console.error(error)
      })
  }
}
