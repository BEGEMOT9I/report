// @flow
import React from 'react'
import { AppContainer } from 'react-hot-loader'
import { render } from 'react-dom'

import PageProvider from '../containers/PageProvider'
import ClientApp from './ClientApp'

const rootElement = document.getElementById('root')

const RenderApp = (App: Class<ClientApp>) => {
  render(
    <AppContainer>
      <PageProvider>
        <App />
      </PageProvider>
    </AppContainer>,
    rootElement
  )
}

RenderApp(ClientApp)

if (module.hot) {
  // $FlowIgnore
  module.hot.accept('./ClientApp', () => {
    const NextClientApp = require('./ClientApp').default
    RenderApp(NextClientApp)
  })
}
