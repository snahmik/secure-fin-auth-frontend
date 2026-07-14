export function formatRM(amount) {
  return new Intl.NumberFormat('en-MY', {
    style: 'currency',
    currency: 'MYR',
    currencyDisplay: 'code',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount).replace('MYR', 'RM');
}

export function getUserTransactionDescription(transaction){
  const {from,to,amount} = transaction

  const isDeposit = from === to

  if (isDeposit) {
    return `Deposit`
  }

  //External transfer
  if (amount < 0) {
    return `Transfer to ${to}`
  }

  return `Transfer from ${to}`
}