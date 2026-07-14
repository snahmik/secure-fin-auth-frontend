export function formatRM(amount) {
  const numericAmount = Number(amount);
  const prefix = numericAmount < 0 ? '- ' : '+ ';

  const formattedAmount = new Intl.NumberFormat('en-MY', {
    style: 'currency',
    currency: 'MYR',
    currencyDisplay: 'code',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(numericAmount)).replace('MYR', 'RM');

  return `${prefix}${formattedAmount}`;
}

export function getCurrentDate(dateValue = Date.now()) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(dateValue));
}

export function getCurrentDayAndDate(dateValue = Date.now()) {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(dateValue));
}

export function getCurrentDateTime(dateValue = Date.now()) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(dateValue));
}




