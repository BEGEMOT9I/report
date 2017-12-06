// @flow
import React, { type Node } from 'react'

import classes from './styles.scss'

type Props = {
  children: Node
}

const AppContainer = (props: Props) => {
  return <main className={classes.layout}>{props.children}</main>
}

export default AppContainer
