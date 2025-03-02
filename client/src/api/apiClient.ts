async function fetchWithRefresh (url: string, options: RequestInit = {}) {
  try {
    let response = await fetch(url, {
      ...options,
      credentials: 'include', 
      headers: {
        'Content-Type': 'application/json',
        ...options.headers 
      }
    })

    if (response.status === 401) {
      console.warn('Access token expired. Attempting to refresh...')

      // Attempt to refresh the token
      const refreshRes = await fetch('/auth/refresh', {
        method: 'POST',
        credentials: 'include' 
      })

      if (refreshRes.ok) {
        console.log('Token refreshed successfully. Retrying request...')

        // Retry the original request with the new token
        response = await fetch(url, {
          ...options,
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            ...options.headers // Ensure headers persist
          }
        })
      } else {
        console.error('Refresh token expired. Redirecting to login.')
        window.location.href = '/login' // Redirect user to login page
        return Promise.reject('Session expired, please log in again.')
      }
    }

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    return await response.json() // Parse and return JSON response
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
}

export default fetchWithRefresh

// Example usage:
// async function updateUserProfile (newProfileData) {
//   try {
//     const data = await fetchWithRefresh('/api/profile', {
//       method: 'POST',
//       body: JSON.stringify(newProfileData),
//       headers: { Authorization: 'Bearer someAccessToken' } // Optional if needed
//     })
//     console.log('Profile updated:', data)
//   } catch (error) {
//     console.error('Failed to update profile:', error)
//   }
// }
