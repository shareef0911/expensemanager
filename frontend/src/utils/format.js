const CURRENCY = { locale: 'en-IN', code: 'INR' }; // change once, applies everywhere

const money = new Intl.NumberFormat(CURRENCY.locale, { style: 'currency', currency: CURRENCY.code });

export const formatMoney = (n) => money.format(n ?? 0);

export const formatDate = (iso) =>
  iso ? new Date(`${iso}T00:00:00`).toLocaleDateString(CURRENCY.locale, { day: 'numeric', month: 'short', year: 'numeric' }) : '';

export const today = () => new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD in local time

export const initials = (name = '') =>
  name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join('');
