import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Skill = { value: string; label: string }

type User = {
  firstName: string
  lastName: string
  email: string
  password: string
  address1: string
  address2?: string
  city: string
  state: { value: string; label: string }
  zip: string
  skills: Skill[]
  preferences?: string
  availability: string[]
}
const initialState: User = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  address1: '',
  address2: '',
  city: '',
  state: { value: '', label: '' },
  zip: '',
  skills: [],
  preferences: '',
  availability: []
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (_state, action: PayloadAction<User>) => {
      return action.payload
    },
    clearUser: () => {
      return initialState
    },
    addAvailability: (state, action: PayloadAction<string>) => {
      if (!state) return
      if (!state.availability.includes(action.payload)) {
        state.availability.push(action.payload)
      }
    },
    removeAvailability: (state, action: PayloadAction<string>) => {
      if (!state) return
      state.availability = state.availability.filter(
        date => date !== action.payload
      )
    },
    toggleSkill: (
      state,
      action: PayloadAction<{ value: string; label: string }>
    ) => {
      if (!state) return
      if (!state.skills) state.skills = []

      const exists = state.skills.some(
        skill => skill.value === action.payload.value
      )

      if (exists) {
        state.skills = state.skills.filter(
          skill => skill.value !== action.payload.value
        )
      } else {
        state.skills.push(action.payload)
      }
    },
    removeSkills: (state, action: PayloadAction<string>) => {
      state.skills = state.skills.filter(
        skill => skill.value !== action.payload
      )
    }
  }
})

export const {
  setUser,
  clearUser,
  addAvailability,
  removeAvailability,
  toggleSkill
} = userSlice.actions
export default userSlice.reducer
export type UserState = ReturnType<typeof userSlice.reducer>

