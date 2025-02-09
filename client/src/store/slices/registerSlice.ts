import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Skill = { value: string; label: string }
type FormData = {
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

const initialState: FormData = {
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

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<Partial<FormData>>) => {
      return { ...state, ...action.payload }
    },
    addAvailability: (state, action: PayloadAction<string>) => {
      if (!state.availability.includes(action.payload)) {
        state.availability.push(action.payload)
      }
    },
    removeAvailability: (state, action: PayloadAction<string>) => {
      state.availability = state.availability.filter(
        date => date !== action.payload
      )
    },

    toggleSkill: (
      state,
      action: PayloadAction<{ value: string; label: string }>
    ) => {
      if (!state.skills) state.skills = []

      const exists = state.skills.some(
        skill => skill.value === action.payload.value
      )

      if (exists) {
        state.skills = [...state.skills]
      } else {
        state.skills = [...state.skills, action.payload]
      }
    },
    removeSkills: (state, action: PayloadAction<string>) => {
      state.skills = state.skills.filter(
        skill => skill.value !== action.payload
      )
    },
    clearFormData: () => initialState
  }
})

export const {
  setFormData,
  addAvailability,
  removeAvailability,
  toggleSkill,
  clearFormData,
  removeSkills
} = registerSlice.actions
export default registerSlice.reducer

export type RegisterState = ReturnType<typeof registerSlice.reducer>
