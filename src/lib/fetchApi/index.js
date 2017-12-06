// @flow
import { AUTH_TOKEN } from '../constants'

type Params = {
  url: string,
  path: string,
  params?: Array<{
    key: string,
    value: string | number
  }>
}

export default function fetchApi({ url, path, params }: Params) {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${AUTH_TOKEN}`
  }
  const paramsString = params
    ? params.reduce(
        (result, param) => `${result}&${param.key}=${param.value}`,
        '?'
      )
    : ''
  const request = new Request(`${url}${path}${paramsString}`, {
    headers,
    method: 'GET'
  })

  // $FlowIgnore
  return fetch(request).then(response => {
    // eslint-disable-next-line no-console
    console.log(response)

    if (!response.ok) {
      throw Error(`${response.status} ${response.statusText}`)
    } else {
      return response.json()
    }
  })
}
