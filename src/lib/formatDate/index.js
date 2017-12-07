// @flow
export default function(date: Date) {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()

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
