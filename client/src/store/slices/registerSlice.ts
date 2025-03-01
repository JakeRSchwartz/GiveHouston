import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

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
  availability: string[],
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null

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
  availability: [],
  status: 'idle',
  error: null
}

//Async Thunks
export const registerUser = createAsyncThunk(
  'registerUser',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      if (response.ok) {
        return await response.json()
      }
      return rejectWithValue('Failed to register')
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.toString())
      }
      return rejectWithValue('An unknown error occurred')
    }
  }
)


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
  },
  extraReducers: builder => {
    builder.addCase(registerUser.pending, state => {
      state.status = 'loading'
    })
    builder.addCase(registerUser.fulfilled, state => {
      state.status = 'succeeded'
    })
    builder.addCase(registerUser.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.payload as string
    })
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
