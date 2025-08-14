import { isBefore, isWithinInterval } from 'date-fns'

export function isDateBetween(start: Date, end: Date) {
  return isWithinInterval(new Date(), { start, end })
}

export function isDateExpired(date: Date | string | number) {
  return isBefore(new Date(date), new Date())
}
