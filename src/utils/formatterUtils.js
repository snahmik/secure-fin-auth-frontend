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

export function formatTransactionRecord(transaction, currentUserAccountNumber) {
  const {
    sender_account,
    recipient_account,
    sender_name,
    recipient_name,
    amount,
    status,
    created_at
  } = transaction;

  const isOwnerSender = sender_account === currentUserAccountNumber;
  const isDeposit = sender_account === recipient_account;
  const formattedDate = getCurrentDateTime(created_at);

  if (isDeposit) {
    return {
      date: formattedDate,
      description: 'Deposit',
      amount: formatRM(amount),
      status: status
    };
  }

  if (isOwnerSender) {
    return {
      date: formattedDate,
      description: `Transfer to ${recipient_name}`,
      amount: formatRM(-Math.abs(amount)),
      status: status
    };
  }

  return {
    date: formattedDate,
    description: `Transfer from ${sender_name}`,
    amount: formatRM(amount),
    status: status
  };
}




