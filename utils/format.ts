export const parseTime = (time: string): string => {
  const [hourPart, minutePart] = time.split(':')
  const ampm = time.includes('a. m.') ? 'am' : 'pm'

  return `${hourPart}:${minutePart} ${ampm}`
}
