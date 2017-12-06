// @flow
import type { Dispatch, GetState } from 'redux'

import type { State as DataState } from '../src/lib/reducers/data'

/* global ThunkAction */
declare type ThunkAction = (dispatch: Dispatch<*>, getState: GetState) => any

/* global GlobalState */
declare type GlobalState = DataState
