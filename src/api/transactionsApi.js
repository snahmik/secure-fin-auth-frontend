const apiURL = import.meta.env.VITE_API_URL

export async function performDeposit(amount) {
  try {
    const res = await fetch(apiURL + '/transactions/deposit',
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(
          {amount}
        )
      }
    )

    if (!res.ok) {
      return {success: false, error: {type: 'amount', message: 'Failed to perform deposit'}}
    }

    return {success: true}
  } catch (e) {
    return {success: false, error: {type: e.type, message: e.message}}
  }
}

export async function createTransaction(recipientAccount, amount) {
  try {
    const res = await fetch(apiURL + '/transactions',
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(
          {'recipient_account': recipientAccount, 'amount': amount}
        )
      }
    )

    const resData = await res.json()

    if (!res.ok) {
      return {success: false, error: {type: 'transfer', message: resData.message}}
    }

    return {success: true}
  } catch (e) {
    return {success: false, error: {type: e.type, message: e.message}}
  }

}

export async function fetchTransactionHistory() {
  try {
    const res = await fetch(apiURL + '/transactions/me',
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        }
      }
    )

    if (!res.ok) {
      return {success: false, error: {message: 'Failed to fetch transaction history'}}
    }

    const transactionData = await res.json()
    return {success: true, transactionData}
  } catch (e) {
    return {success: false, error: {message: e.message}}
  }
}

export async function fetchAllTransactions() {
  try {
    const res = await fetch(apiURL + '/admin/transactions',
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        }
      }
    )

    if (!res.ok) {
      return {success: false, error: {message: 'Failed to fetch all transactions'}}
    }

    const transactionData = await res.json()
    return {success: true, transactionData}
  } catch (e) {
    return {success: false, error: {message: e.message}}
  }
}

export async function approveTransaction(transactionId) {
  try {
    const res = await fetch(apiURL + `/transactions/${transactionId}/approve`,
      {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        }
      }
    )

    if (!res.ok) {
      return {success: false, error: {message: 'Failed to approve transaction'}}
    }

    return {success: true}
  } catch (e) {
    return {success: false, error: {message: e.message}}
  }
}

export async function rejectTransaction(transactionId) {
  try {
    const res = await fetch(apiURL + `/transactions/${transactionId}/reject`,
      {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        }
      }
    )

    if (!res.ok) {
      return {success: false, error: {message: 'Failed to reject transaction'}}
    }

    return {success: true}
  } catch (e) {
    return {success: false, error: {message: e.message}}
  }
}
