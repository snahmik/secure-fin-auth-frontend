const apiURL = import.meta.env.VITE_API_URL

export async function retrieveSession() {
  try {
    const res = await fetch(apiURL + '/auth/me',
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        }
      })

    if (!res.ok) {
      return {success: false, message: 'Failed to retrieve session'}
    }

    const resData = await res.json()
    return {success: true, user: resData}
  } catch (e) {
    return {success: false, message: e.message}
  }
}

export async function loginUser(email, password) {
  try {
    const res = await fetch(apiURL + '/auth/login',
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(
          {
            email,
            password
          }
        )
      })

    const resData = await res.json()

    if (!res.ok) {
      const {type, message} = resData
      return {success: false, error: {type, message}}
    }

    return {success: true, data: resData}
  } catch (e) {
    return {success: false, error: {type: e.type, message: e.message}}
  }
}

export async function registerUser(name, email, password) {
  try {
    const res = await fetch(apiURL + '/auth/register',
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(
          {
            name,
            email,
            password
          }
        )
      })

    const resData = await res.json()

    if (!res.ok) {
      const {type, message} = resData
      return {success: false, error: {type, message}}
    }

    return {success: true, user: resData.user}
  } catch (e) {
    return {success: false, error: {type: e.type, message: e.message}}
  }
}

export async function logoutUser() {
  try{
    const res = await fetch(apiURL + '/auth/logout',
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      })

    if (!res.ok){
      return {success: false, message: 'Failed to logout'}
    }

    return {success: true}

  } catch (e) {
    return {success: false, message: e.message}
  }
}

export async function fetchUserProfile(userId) {
  try{
    let refreshedUserId;
    if (!userId) {
      const sessionResponse = await retrieveSession()
      if (!sessionResponse.success) {
        return {success: false, message: 'Failed to retrieve session for user profile'}
      }
      refreshedUserId = sessionResponse.user.user_id
    }

    const res = await fetch(apiURL + `/users/${!userId ? refreshedUserId : userId}`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        }
      })

    if (!res.ok){
      return {success: false, message: 'Failed to fetch user profile'}
    }

    const resData = await res.json()

    const userData = {
      name: resData.name,
      balance: resData.balance,
      accountNumber: resData['account_number'],
    }

    return {success: true, userData}
  } catch (e) {
    return {success: false, message: e.message}
  }
}
