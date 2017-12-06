// @flow
import type { Dispatch, GetState } from 'redux'

import type { State as DataState } from '../src/lib/reducers/data'

declare module '@amcharts/amcharts3-react' {
  declare module.exports: any
}

/* global ThunkAction */
declare type ThunkAction = (dispatch: Dispatch<*>, getState: GetState) => any

/* global GlobalState */
declare type GlobalState = DataState

/* global Entry */
declare type Entry = {
  bookings: number,
  btr: string,
  clicks: number,
  ctr: string,
  duration: string,
  errors: string,
  sales: number,
  searches: number,
  str: string,
  success: string,
  time: string,
  timeouts: string,
  unique_clicks: number,
  zeros: string
}
