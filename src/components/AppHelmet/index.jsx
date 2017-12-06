// @flow
import React, { Component } from 'react'
import Helmet from 'react-helmet'

type Props = {
  lang: string,
  title: string,
  titleTemplate: string
}

class AppHelmet extends Component<Props> {
  static defaultProps = {
    lang: 'ru',
    titleTemplate: 'My app'
  }

  render() {
    const { lang, title, titleTemplate } = this.props

    return (
      <Helmet
        defaultTitle={titleTemplate}
        titleTemplate={`%s | ${titleTemplate}`}
      >
        <html lang={lang} />
        <meta charSet="UTF-8" />
        {!!title && <title>{title}</title>}
        <meta content="description" name="description" />
      </Helmet>
    )
  }
}

export default AppHelmet
