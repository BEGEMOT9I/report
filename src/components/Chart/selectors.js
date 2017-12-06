// @flow
import { createSelector } from 'reselect'

import { TABLE_FIELDS } from '../../lib/constants'

export const getData = ({ data }: GlobalState) => (data ? data.data : undefined)

export const getEntries = createSelector(
  [getData],
  (
    data:
      | {
          data: Array<Entry>,
          recordsFiltered: number,
          recordsTotal: number
        }
      | typeof undefined
  ) => {
    if (data) {
      return data.data.map(entry => {
        let resultEntry = {}

        TABLE_FIELDS.forEach(
          field => (resultEntry[field.key] = entry[field.key])
        )

        return resultEntry
      })
    }

    return undefined
  }
)
