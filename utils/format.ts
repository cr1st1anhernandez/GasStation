export const formatDate = (date: Date | string) => {
  if (!date) return ''
  const dateObj = typeof date === 'string' ? new Date(date) : date

  return dateObj.toLocaleString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}
