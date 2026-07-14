export function validateName(name) {
  let errors = []

  if (!name || name.trim() === '') {
    errors.push({type: 'name', message: 'Name is required'})
  }

  return errors
}

export function validateEmail(email) {
  let errors = []

  if (!email || email.trim() === '') {
    errors.push({type: 'email', message: 'Email is required'})
  } else if (!email.includes('@') && !email.includes('.')) {
    errors.push({type: 'email', message: 'Email is invalid'})
  }

  return errors
}

export function validatePassword(password) {
  let errors = []

  if(!password || password.trim() === '') {
    errors.push({type: 'password', message: 'Password is required'})
    return errors
  }

  if (password.length < 8) {
    errors.push({type: 'password', message: 'Password must be at least 8 characters long'})
  }

  if (!password.match(/[A-Z]/) || !password.match(/[a-z]/) || !password.match(/[0-9]/)) {
    errors.push({
      type: 'password',
      message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    })
  }

  return errors
}

export function validateTransferAmount(amount) {
  let errors = []

  if (!amount || amount.trim() === '') {
    errors.push({type: 'amount', message: 'Amount is required'})
    return errors
  }

  if (Number.isNaN(Number(amount))) {
    errors.push({type: 'amount', message: 'Amount must be a number'})
    return errors
  }

  if (amount < 0) {
    errors.push({type: 'amount', message: 'Amount must be a positive number'})
  }

  return errors
}

export function validateTransferRecipient(recipientAcc) {
  let errors = []

  if (!recipientAcc || recipientAcc.trim() === '') {
    errors.push({type: 'transfer', message: 'Recipient account is required'})
  }

  if (Number.isNaN(Number(recipientAcc))) {
    console.log("recipientAcc is NaN")
    errors.push({type: 'transfer', message: 'Recipient account must be numeric'})
  }

  return errors
}