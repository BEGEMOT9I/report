// @flow
export default function(date: string) {
  const matchValues = date.match(/^(\d{4})-(\d{2})-(\d{2})\s(\d{2}):(\d{2})/)

  if (matchValues) {
    return {
      year: +matchValues[1],
      month: +matchValues[2] - 1,
      day: +matchValues[3],
      hours: +matchValues[4],
      minutes: +matchValues[5]
    }
  }

  return {
    year: 0,
    month: 0,
    day: 0,
    hours: 0,
    minutes: 0
  }
}
