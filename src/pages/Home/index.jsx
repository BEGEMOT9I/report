// @flow
import React, { Component } from 'react'

import Report from '../../components/Report'
import classes from './styles.scss'
import { visuallyHidden } from '../../components/AppContainer/styles.scss'

type Props = {}

class Home extends Component<Props> {
  render() {
    return (
      <section className={classes.home}>
        <h1 className={visuallyHidden}>Главная страница</h1>
        <Report />
      </section>
    )
  }
}

export default Home
