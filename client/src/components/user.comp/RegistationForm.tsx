import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { stateDropdown, skillDropdown } from '../../types/dropdownjson'
import '../../styles/registration.styles.css'
import ReusableBtn from '../reusable.cont/ReusableBtn'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../store/store'
import { RootState } from '../../store/store'
import Select, { SingleValue } from 'react-select'
import { FaArrowAltCircleRight } from 'react-icons/fa'
import { FaArrowAltCircleLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import {
  setFormData,
  addAvailability,
  toggleSkill,
  removeSkills,
  removeAvailability,
  registerUser
} from '../../store/slices/registerSlice'
import { useState } from 'react'
export default function RegistrationForm () {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const [nextPage, setNextPage] = useState<boolean>(false)
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  const formData = useSelector((state: RootState) => state.register) || {
    skills: [],
    availability: []
  }
  const stateOptions = stateDropdown.map(state => ({
    value: state.abbreviation,
    label: `${state.abbreviation}`
  }))

  // Handle majority of data changes
  const handleChanges = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    dispatch(setFormData({ [name]: value }))
  }

  // Handle state changes for skills because it's a multi-select
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

  // Handle date changes for availability because it's a multi-select
  const handleDateChange = (date: Date | null) => {
    if (date) {
      const formattedDate = date.toISOString().split('T')[0]
      console.log('formattedDate:', formattedDate)
      console.log('formData:', formData)

      if (!formData.availability.includes(formattedDate)) {
        dispatch(addAvailability(formattedDate))
      }
    }
  }

  // Handle form submission
  const handleSubmit = (e?: React.FormEvent<Element>) => {
    e?.preventDefault()
    dispatch(registerUser(formData))
    navigate('/')
  }

  const handleNextPage = () => {
    if (formData.password !== confirmPassword) {
      alert('Passwords do not match')
    } else {
      setNextPage(true)
    }
  }

  return (
    <>
      {!nextPage ? (
        <>
          <h1 className='regi-bigheader'>
            {' '}
            Lets Make peoples lives Better Togethor
          </h1>
          <form className='regi-form-first'>
            <h1>Lets get started</h1>
            <div className='form-group-first'>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChanges}
              />
            </div>
            <div className='form-group-first'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChanges}
              />
            </div>
            <div className='form-group-first'>
              <label htmlFor='password'>Confirm Password</label>
              <input
                type='password'
                name='confirmPassword'
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className='button-div-first'>
              <ReusableBtn
                type='button'
                className='genericBtn'
                styles={{ fontSize: '1.5rem' }}
                onClick={handleNextPage}
              >
                NEXT
                <FaArrowAltCircleRight />
              </ReusableBtn>
            </div>
          </form>
        </>
      ) : (
        <>
          <h1 className='regi-bigheader' style={{ marginTop: '2rem' }}>
            One step closer to generosity
          </h1>
          <div className='second-form-div'>
            <h1>Personal Information</h1>
            <form action='submit' className='regi-form-second'>
              <div className='form-group-second span3'>
                <label htmlFor='firstName'>First Name</label>
                <input
                  type='text'
                  name='firstName'
                  value={formData.firstName}
                  onChange={handleChanges}
                />
              </div>
              <div className='form-group-second span3'>
                <label htmlFor='lastName'>Last Name</label>
                <input
                  type='text'
                  name='lastName'
                  value={formData.lastName}
                  onChange={handleChanges}
                />
              </div>
              <div className='form-group-second span6'>
                <label htmlFor='address1'>Address</label>
                <input
                  type='text'
                  name='address1'
                  value={formData.address1}
                  onChange={handleChanges}
                />
              </div>
              <div className='form-group-second span6'>
                <label htmlFor='address2'>Address 2</label>
                <input
                  type='text'
                  name='address2'
                  value={formData.address2}
                  onChange={handleChanges}
                />
              </div>
              <div className='form-group-second span2'>
                <label htmlFor='city'>City</label>
                <input
                  type='text'
                  name='city'
                  value={formData.city}
                  onChange={handleChanges}
                />
              </div>
              <div className='form-group-second span2'>
                <label style={{ marginBottom: '3px' }} htmlFor='state'>
                  State
                </label>

                <Select
                  options={stateOptions}
                  onChange={(
                    e: SingleValue<{ value: string; label: string }>
                  ) =>
                    dispatch(
                      setFormData({
                        state: e as { value: string; label: string }
                      })
                    )
                  }
                />
              </div>
              <div className='form-group-second span2'>
                <label htmlFor='zip'>Zip</label>
                <input
                  type='text'
                  name='zip'
                  value={formData.zip}
                  onChange={handleChanges}
                />
              </div>
              <div className='form-group-second span3'>
                <label htmlFor='skills'>Skills</label>
                <select name='skills' onChange={handleSkillsChange} multiple>
                  {skillDropdown.map(skill => (
                    <option key={skill.value} value={skill.value}>
                      {skill.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className='form-group-second-extra span3'>
                <div className='dropdowndisplay'>
                  {formData.skills.map(skill => (
                    <div className='singledisplay' key={skill.value}>
                      {skill.label}{' '}
                      <button
                        className='removeBtn'
                        type='button'
                        onClick={() => dispatch(removeSkills(skill.value))}
                      >
                        ✖
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className='form-group-second span6'>
                <label htmlFor='preferences'>Preferences</label>
                <textarea
                  style={{ height: '100px', width: '100%', outline: 'none' }}
                  name='preferences'
                  value={formData.preferences}
                  onChange={handleChanges}
                />
              </div>
              <div className='form-group-second span3'>
                <label htmlFor='availability'>Availability</label>
                <DatePicker
                  minDate={new Date()}
                  selected={null}
                  onChange={date => handleDateChange(date)}
                  inline
                />
              </div>
              <div className='form-group-second-extra span3'>
                <div className='dropdowndisplay'>
                  {formData.availability.map(date => (
                    <div className='singledisplay' key={date}>
                      {date}{' '}
                      <button
                        className='removeBtn'
                        type='button'
                        onClick={() => dispatch(removeAvailability(date))}
                      >
                        ✖
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </form>
            <div className='button-div-second'>
              <ReusableBtn
                type='button'
                className='genericBtn'
                styles={{ fontSize: '1.5rem' }}
                onClick={() => setNextPage(false)}
              >
                <FaArrowAltCircleLeft />
                BACK
              </ReusableBtn>
              <ReusableBtn
                onClick={() => handleSubmit()}
                type='submit'
                className='submitBtn'
                styles={{ fontSize: '2rem' }}
              >
                SUBMIT
              </ReusableBtn>
            </div>
          </div>
        </>
      )}
    </>
  )
}
