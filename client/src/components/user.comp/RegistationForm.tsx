import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { stateDropdown, skillDropdown } from '../../types/dropdownjson'
import '../../styles/auth.styles.css'
import ReusableBtn from '../reusable.cont/ReusableBtn'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import Select, { SingleValue } from 'react-select'
import { Controller, useForm } from 'react-hook-form'

import {
  setFormData,
  addAvailability,
  toggleSkill,
  removeSkills
} from '../../store/slices/registerSlice'
export default function RegistrationForm () {
  const { control } = useForm()
  const dispatch = useDispatch()
  const formData = useSelector((state: RootState) => state.register) || {
    skills: [],
    availability: []
  }
  const stateOptions = stateDropdown.map(state => ({
    value: state.abbreviation,
    label: `${state.name} (${state.abbreviation})`
  }))

  const handleChanges = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    dispatch(setFormData({ [name]: value }))
  }

  const handleSkillsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSkills = Array.from(e.target.selectedOptions).map(option => ({
      value: option.value,
      label: option.text
    }))
    dispatch(
      toggleSkill({
        value: selectedSkills[0].value,
        label: selectedSkills[0].label
      })
    )
    console.log('selectedSkills:', selectedSkills)
    console.log('formData:', formData.skills)
  }

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const formattedDate = date.toISOString().split('T')[0] // Extracts "YYYY-MM-DD"
      console.log('formattedDate:', formattedDate)
      console.log('formData:', formData)

      if (!formData.availability.includes(formattedDate)) {
        dispatch(addAvailability(formattedDate)) // Add if not in the list
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitted Data:', formData)
  }

  return (
    <form className='reg-form' onSubmit={handleSubmit}>
      <h1>REGISTER NOW</h1>
      <div className='form-group'>
        <label htmlFor='firstName'>First Name</label>
        <input
          type='text'
          id='firstName'
          name='firstName'
          onChange={handleChanges}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='lastName'>Last Name</label>
        <input
          type='text'
          id='lastName'
          name='lastName'
          onChange={handleChanges}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='address1'>Address 1</label>
        <input
          type='text'
          id='address1'
          name='address1'
          onChange={handleChanges}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='address2'>Address 2</label>
        <input
          type='text'
          id='address2'
          name='address2'
          onChange={handleChanges}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' name='city' onChange={handleChanges} />
      </div>
      <div className='form-group' style={{ marginTop: '1.5rem' }}>
        <label htmlFor='state'>State</label>
        <Controller
          name='state'
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={stateOptions}
              value={stateOptions.find(
                option => option.value === formData.state?.value
              )} 
              onChange={(
                newValue: SingleValue<{ value: string; label: string }> | null
              ) => {
                if (newValue) {
                  console.log('newValue:', newValue)
                  dispatch(setFormData({ state: newValue }))
                  console.log(formData)
                }
              }}
              placeholder='Select a State'
              styles={{
                control: provided => ({
                  ...provided,
                  backgroundColor: '#f8f9fa',
                  borderRadius: '5px',
                  padding: '5px'
                }),
                menu: provided => ({
                  ...provided,
                  backgroundColor: '#fff'
                })
              }}
            />
          )}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='zip'>Zip</label>
        <input type='text' id='zip' name='zip' onChange={handleChanges} />
      </div>
      <div className='form-group' style={{ marginTop: '3rem' }}>
        <label htmlFor='skills'>Skills</label>
        <select
          id='skills'
          name='skills'
          multiple
          value={formData.skills.map(skill => skill.value)}
          onChange={handleSkillsChange}
        >
          {skillDropdown.map(skill => (
            <option key={skill.value} value={skill.value}>
              {skill.label}
            </option>
          ))}
        </select>
        <div style={{ overflow: 'auto', maxHeight: '80px' }}>
          {formData.skills.length > 0
            ? formData.skills.map(skill => (
                <div style={{ display: 'flex' }} key={skill.value}>
                  {skill.label}{' '}
                  <button className='skill-cancel'onClick={() => dispatch(removeSkills(skill.value))}>✖</button>
                </div>
              ))
            : 'No skills selected'}
        </div>
      </div>
      <div className='form-group'>
        <label htmlFor='preferences'>Preferences</label>
        <textarea
          id='preferences'
          name='preferences'
          onChange={handleChanges}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='availability'>Availability</label>
        <DatePicker
          id='availability'
          name='availability'
          selected={null}
          minDate={new Date()}
          onChange={(date: Date | null) => handleDateChange(date)}
          dateFormat='MM/dd/yyyy'
          placeholderText='Select multiple dates'
        />
        <div style={{ overflow: 'auto', maxHeight: '80px' }}>
          <strong>Selected Dates:</strong>
          {formData.availability.length > 0
            ? [...formData.availability]
                .sort((a, b) => new Date(a).getTime() - new Date(b).getTime()) // Sort chronologically
                .map(date => <div key={date}>{date}</div>)
            : 'No dates selected'}
        </div>
      </div>
      <div className='form-group'>
        <ReusableBtn
          type='submit'
          className='submitBtn'
          styles={{ fontSize: '1.5rem' }}
        >
          Submit
        </ReusableBtn>
      </div>
    </form>
  )
}
