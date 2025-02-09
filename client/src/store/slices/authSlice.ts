import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Auth = {
  email: string
  password: string
  token: string
  jwt: string
  cookies?: string
}

const initialState: Auth = {
  email: '',
  password: '',
  token: '',
  jwt: '',
  cookies: '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<Auth>) => {
      return { ...state, ...action.payload }
    },
    clearCredentials: (state) => {
      state.email = '';
      state.password = '';
      state.token = '';
      state.jwt = '';
    },
    setToken: (_state, action: PayloadAction<string>) => {
      localStorage.setItem('token', action.payload)
    }
  }
})

export const { setCredentials, clearCredentials, setToken } = authSlice.actions
export default authSlice.reducer
export type AuthState = ReturnType<typeof authSlice.reducer>
