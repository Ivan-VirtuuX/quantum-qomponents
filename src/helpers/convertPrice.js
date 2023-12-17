export const convertPrice = (price) => {
  return `${String(price).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}₽`
}
