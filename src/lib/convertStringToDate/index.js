// @flow
import parseDateString from '../parseDateString'

export default function(date: string) {
  const parsedDate = parseDateString(date)

  return new Date(
    parsedDate.year,
    parsedDate.month,
    parsedDate.day,
    parsedDate.hours,
    parsedDate.minutes
  )
}
