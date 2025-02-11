import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Skill {
  value: string;
  label: string;
}

interface FormData {
  eventName: string;
  eventDescription: string;
  location: string;
  skills: Skill[];
  urgency: string;
  eventDate: string;
}

const initialState: FormData = {
  eventName: '',
  eventDescription: '',
  location: '',
  skills: [],
  urgency: '',
  eventDate: ''
};

const eventCreationSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
      setFormData: (state, action: PayloadAction<Partial<FormData>>) => {
        return { ...state, ...action.payload };
      },
      toggleSkill: (state, action: PayloadAction<Skill>) => {
        const exists = state.skills.some(skill => skill.value === action.payload.value);
        if (exists) {
          state.skills = state.skills.filter(skill => skill.value !== action.payload.value);
        } else {
          state.skills.push(action.payload);
        }
      },
      removeSkills: (state, action: PayloadAction<string>) => {
        state.skills = state.skills.filter(skill => skill.value !== action.payload);
      },
      setEventDate: (state, action: PayloadAction<string>) => {
        state.eventDate = action.payload;
      },
      clearFormData: () => initialState
    }
  });
  
  export const {
    setFormData,
    toggleSkill,
    clearFormData,
    removeSkills,
    setEventDate
  } = eventCreationSlice.actions;
  export default eventCreationSlice.reducer;
  
  export type EventCreationState = ReturnType<typeof eventCreationSlice.reducer>;
  