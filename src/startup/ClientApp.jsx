// @flow
import React, { Component } from 'react'
import { Route, Switch } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'

import AppHelmet from '../components/AppHelmet'
import AppContainer from '../components/AppContainer'

import history from '../lib/store/history'
import routes from '../routes'

type Props = {}

class ClientApp extends Component<Props> {
  render() {
    return (
      <ConnectedRouter history={history}>
        <AppContainer>
          <AppHelmet title="Report" />
          <Switch>
            {// eslint-disable-next-line prettier/prettier
              routes.map(route =>
                <Route key={route.path} {...route} />
              )
            }
          </Switch>
        </AppContainer>
      </ConnectedRouter>
    )
  }
}

export default ClientApp
