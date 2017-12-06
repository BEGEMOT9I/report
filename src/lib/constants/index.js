// @flow
export const AUTH_TOKEN =
  'eyJpYXQiOjE1MDkzNDEzNzgsImFsZyI6IkhTMjU2IiwiZXhwIjoxNTQwNDQ1Mzc4fQ.eyJpZCI6MTI2NiwicGVybWlzc2lvbnMiOlsiQmFzaWMgUmVwb3J0cyJdLCJnYXRlX2lkIjotMTQzLCJleHAiOiIyMDE4LTEwLTI1IDA1OjI5OjM4In0.dD_So803EIkRM86ARm1RxPy85lzNse2hNaPMjndkPpg'
export const TABLE_FIELDS = [
  {
    key: 'time',
    name: 'Date'
  },
  {
    key: 'searches',
    name: 'Searches'
  },
  {
    key: 'clicks',
    name: 'Clicks'
  },
  {
    key: 'unique_clicks',
    name: 'Unq. Clicks'
  },
  {
    key: 'ctr',
    name: 'CTR',
    avg: true
  },
  {
    key: 'bookings',
    name: 'Bookings'
  },
  {
    key: 'sales',
    name: 'Sales'
  },
  {
    key: 'btr',
    name: 'BTR',
    avg: true
  },
  {
    key: 'str',
    name: 'STR',
    avg: true
  },
  {
    key: 'success',
    name: 'Success %',
    avg: true
  },
  {
    key: 'errors',
    name: 'Errors %',
    avg: true
  },
  {
    key: 'zeros',
    name: 'Zeros %',
    avg: true
  },
  {
    key: 'timeouts',
    name: 'T/O %',
    avg: true
  },
  {
    key: 'duration',
    name: 'Avg Resp',
    avg: true
  }
]
