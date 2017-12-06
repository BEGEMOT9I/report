// @flow
export default function(date: Date) {
  const year = date.getUTCFullYear()
  const month = date.getUTCMonth()
  const day = date.getUTCDate()

  return (
    year +
    '-' +
    (month + 1 < 10 ? '0' : '') +
    (month + 1) +
    '-' +
    (day < 10 ? '0' : '') +
    day
  )
}
