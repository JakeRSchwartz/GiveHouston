import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { urgencyDropdown, skillDropdown } from '../../types/dropdownjson';
import '../../styles/registration.styles.css';
import ReusableBtn from '../reusable.cont/ReusableBtn';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Select, { SingleValue } from 'react-select';
import { setFormData, toggleSkill, removeSkills, setEventDate } from '../../store/slices/eventCreationSlice';

export default function EventCreationForm() {
  const dispatch = useDispatch();
  
  const formData = useSelector((state: RootState) => state.event) || {
    eventName: '',
    eventDescription: '',
    location: '',
    skills: [],
    urgency: '',
    eventDate: ''
  };

  const urgencyOptions = urgencyDropdown.map(urgency => ({
    value: urgency.value,
    label: `${urgency.label}`
  }));

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    dispatch(setFormData({ [name]: value }));
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSkills = Array.from(e.target.selectedOptions).map(option => ({
      value: option.value,
      label: option.text
    }));
    dispatch(toggleSkill({
      value: selectedSkills[0].value,
      label: selectedSkills[0].label
    }));
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const formattedDate = date.toISOString().split('T')[0];
      dispatch(setEventDate(formattedDate));
    }
  };

  const handleSubmit = (e?: React.FormEvent<Element>) => {
    e?.preventDefault();
    if (
      !formData.eventName ||
      !formData.eventDescription ||
      !formData.location ||
      !formData.skills.length ||
      !formData.urgency ||
      !formData.eventDate
    ) {
      alert('Please fill in all required fields');
      return;
    }
    console.log("Submitted Data:", formData);
  };
    return ( // Change the styles to not be the same as the registration form later.s
        <>
            <h1 className='regi-bigheader' style={{ marginTop: '2rem' }}>
            Create An Event
            </h1>
            <div className='second-form-div'>
                <h1>Event Information</h1>
                <form action="submit" className='regi-form-second'>
                    <div className='form-group-second span6'>
                        <label htmlFor='eventName'>Event Name</label>
                        <input
                        type='text'
                        name='eventName'
                        value={formData.eventName}
                        onChange={handleChanges}
                        maxLength={100}
                        required
                        />
                    </div>
                    <div className='form-group-second span6'>
                        <label htmlFor='eventDescription'>Description</label>
                        <input
                        type='text'
                        name='eventDescription'
                        value={formData.eventDescription}
                        onChange={handleChanges}
                        required
                        />
                    </div>
                    <div className='form-group-second span3'>
                        <label htmlFor='skills'>Skills</label>
                        <select name='skills' onChange={handleSkillsChange} multiple required>
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
                    <div className='form-group-second span3'>
                        <label htmlFor='location'>Location</label>
                        <input
                        type='text'
                        name='location'
                        value={formData.location}
                        onChange={handleChanges}
                        required
                        />
                    </div>
                    <div className='form-group-second span3'>
                    <label htmlFor='eventDate'>Event Date</label>
                    <DatePicker
                        minDate={new Date()}
                        selected={null}
                        onChange={date => handleDateChange(date)}
                        inline
                    />
                    </div>
                    <div className='form-group-second span3'>
                        <label htmlFor='urgency'>Urgency</label>
                        <select name='urgency' onChange={handleChanges} required>
                            {urgencyDropdown.map(urgency => (
                            <option key={urgency.value} value={urgency.value}>
                                {urgency.label}
                            </option>
                            ))}
                        </select>
                    </div>
                    <div className="button-div-right">
                        <ReusableBtn
                        onClick={() => handleSubmit()}
                        type='submit'
                        className='submitBtn'
                        styles={{ fontSize: '2rem' }}
                        >
                        SUBMIT
                        </ReusableBtn>
                    </div>
                </form>
            </div>
        </>
    );
}