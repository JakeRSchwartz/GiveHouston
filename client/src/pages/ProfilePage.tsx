import '../styles/profile.styles.css'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import Select from 'react-select'
import {
  stateDropdown as rawStateDropdown,
  skillDropdown
} from '../types/dropdownjson'
import DatePicker from 'react-datepicker'
import ReusableBtn from '../components/reusable.cont/ReusableBtn'
import 'react-datepicker/dist/react-datepicker.css'

const ProfilePage = () => {
  const [editMode, setEditMode] = useState(false)

  const user = useSelector((state: RootState) => state.register) || {
    skills: [],
    availability: []
  }
  // Transform stateDropdown to match the expected type
  const stateDropdown = rawStateDropdown.map(state => ({
    value: state.name,
    label: state.abbreviation
  }))

  // Toggle Edit Mode
  const toggleEditMode = () => setEditMode(!editMode)

  return (
    <div className='main-profi-div'>
      <h1 className='pofi-bigheader'>Profile Information</h1>

      <div className='second-form-div'>
        <h1>Personal Information</h1>

        {/* Edit Mode Toggle Button */}
        <div className='button-div-second'>
          <ReusableBtn
            type='button'
            className='genericBtn'
            styles={{ fontSize: '1.5rem' }}
            onClick={toggleEditMode}
          >
            {editMode ? 'Cancel' : 'Edit'}
          </ReusableBtn>
        </div>

        <form className='regi-form-second'>
          {/* First Name */}
          <div className='form-group-second span3'>
            <label>First Name</label>
            {editMode ? (
              <input
                type='text'
                name='firstName'
                defaultValue={user.firstName}
              />
            ) : (
              <p>{user.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div className='form-group-second span3'>
            <label>Last Name</label>

            {editMode ? (
              <input type='text' name='lastName' defaultValue={user.lastName} />
            ) : (
              <p>{user.lastName}</p>
            )}
          </div>

          {/* Address */}
          <div className='form-group-second span6'>
            <label>Address</label>
            {editMode ? (
              <input type='text' name='address1' defaultValue={user.address1} />
            ) : (
              <p>{user.address1}</p>
            )}
          </div>

          {/* Address 2 */}
          <div className='form-group-second span6'>
            <label>Address 2</label>
            {editMode ? (
              <input type='text' name='address2' defaultValue={user.address2} />
            ) : (
              <p>{user.address2 || 'N/A'}</p>
            )}
          </div>

          {/* City */}
          <div className='form-group-second span2'>
            <label>City</label>
            {editMode ? (
              <input type='text' name='city' defaultValue={user.city} />
            ) : (
              <p>{user.city}</p>
            )}
          </div>

          {/* State */}
          <div className='form-group-second span2'>
            <label>State</label>
            {editMode ? (
              <Select options={stateDropdown} defaultValue={user.state} />
            ) : (
              <p>{user.state.label}</p>
            )}
          </div>

          {/* Zip Code */}
          <div className='form-group-second span2'>
            <label>Zip</label>
            {editMode ? (
              <input type='text' name='zip' defaultValue={user.zip} />
            ) : (
              <p>{user.zip}</p>
            )}
          </div>

          {/* Skills */}
          <div className='form-group-second span3'>
            <label>Skills</label>

            {editMode ? (
              <select name='skills' multiple>
                {skillDropdown.map(skill => (
                  <option key={skill.value} value={skill.value}>
                    {skill.label}
                  </option>
                ))}
              </select>
            ) : (
              <p>
                {user.skills.length
                  ? user.skills.map(skill => skill.label).join(', ')
                  : 'None'}
              </p>
            )}
          </div>
          {editMode && (
            <div className='form-group-second-extra span3'>
              <div className='dropdowndisplay'></div>
            </div>
          )}

          {/* Availability */}
          <div className='form-group-second span3'>
            <label>Availability</label>
            {editMode ? (
              <DatePicker minDate={new Date()} inline />
            ) : (
              <p>
                {user.availability.length
                  ? user.availability.join(', ')
                  : 'No availability set'}
              </p>
            )}
          </div>
          {editMode && (
            <div className='form-group-second-extra span3'>
              <div className='dropdowndisplay'></div>
            </div>
          )}

          {/* Save Button in Edit Mode */}
          {editMode && (
            <div className='button-div-second'>
              <ReusableBtn
                type='button'
                className='genericBtn'
                styles={{ fontSize: '1.5rem' }}
                onClick={toggleEditMode}
              >
                Save
              </ReusableBtn>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default ProfilePage
