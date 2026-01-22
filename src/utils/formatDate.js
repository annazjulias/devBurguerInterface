export function formateDate(date){
  return new Date(date).toLocaleString('pt-Br', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}