// @flow
import React, { type Element } from 'react'
import { Provider } from 'react-redux'

import configureStore from '../../lib/store'

type Props = {
  children: Element<*>
}

const store = configureStore()

const PageProvider = ({ children }: Props) => {
  return <Provider store={store}>{children}</Provider>
}

export default PageProvider
