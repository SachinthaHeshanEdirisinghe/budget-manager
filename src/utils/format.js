export const formatMoney = (n) =>
  'Rs ' +
  Number(n || 0)
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const formatDate = (iso) => {
  const d = new Date(iso);
  return d.getDate() + ' ' + MONTHS[d.getMonth()];
};