import '../../styles/eventmanage.styles.css'
import charity from '../../assets/charity.jpg'
import charimg from '../../assets/charity2.jpg'
import ReusableBtn from '../../components/reusable.cont/ReusableBtn'
import { useEffect, useState } from 'react'
import { FaPencilAlt, FaTrash } from 'react-icons/fa'
import DatePicker from 'react-datepicker'
import { skillDropdown } from '../../types/dropdownjson'
import Select, { MultiValue } from 'react-select'

interface Event {
  id: number
  logo: string
  title: string
  location: string
  time?: string
  description: string
  skills: string[]
  date: string
}

const EventManagement = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      logo: charity,
      title: 'Community Clean-Up Drive',
      location: 'Central Park, New York, NY',
      time: '9:00 AM - 12:00 PM',
      description:
        'Join us in making our community cleaner and greener! Volunteers will help pick up litter, plant trees, and educate others about sustainability.',
      skills: ['Teamwork', 'Physical Stamina', 'Environmental Awareness'],
      date: '2024-03-15'
    },
    {
      id: 2,
      logo: charimg,
      title: 'Food Bank Distribution',
      location: 'Houston Food Bank, Houston, TX',
      time: '10:00 AM - 2:00 PM',
      description:
        'Help distribute food to families in need. Tasks include sorting donations, packing meal kits, and assisting with food delivery.',
      skills: ['Organization', 'Communication', 'Lifting Heavy Items'],
      date: '2024-04-10'
    },{
      id: 2,
      logo: charimg,
      title: 'Food Bank Distribution',
      location: 'Houston Food Bank, Houston, TX',
      time: '10:00 AM - 2:00 PM',
      description:
        'Help distribute food to families in need. Tasks include sorting donations, packing meal kits, and assisting with food delivery.',
      skills: ['Organization', 'Communication', 'Lifting Heavy Items'],
      date: '2024-04-10'
    },{
      id: 2,
      logo: charimg,
      title: 'Food Bank Distribution',
      location: 'Houston Food Bank, Houston, TX',
      time: '10:00 AM - 2:00 PM',
      description:
        'Help distribute food to families in need. Tasks include sorting donations, packing meal kits, and assisting with food delivery.',
      skills: ['Organization', 'Communication', 'Lifting Heavy Items'],
      date: '2024-04-10'
    }
  ])

  const [editMode, setEditMode] = useState<number | null>(null)

  interface Skill {
    value: string
    label: string
  }
  const skillOptions = skillDropdown.map(skill => ({
    value: skill.value,
    label: skill.label
  })) as Skill[]
  // Sort events by both date and time
  useEffect(() => {
    const sorted = [...events].sort((a, b) => {
      const dateTimeA = new Date(`${a.date} ${a.time}`).getTime()
      const dateTimeB = new Date(`${b.date} ${b.time}`).getTime()
      return dateTimeA - dateTimeB
    })
    setEvents(sorted)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Handle Edit
  const handleEdit = (id: number) => {
    setEditMode(id === editMode ? null : id)
  }

  // Handle Change in Editable Fields
  const handleChange = (
    id: number,
    field: keyof Event,
    value: string | string[]
  ) => {
    setEvents(prev =>
      prev.map(event =>
        event.id === id ? { ...event, [field]: value } : event
      )
    )
  }

  // Handle Delete
  const handleDelete = (id: number) => {
    setEvents(prev => prev.filter(event => event.id !== id))
  }

  return (
    <div className='main-events-div'>
      <h1>Manage Events</h1>
      <div className='top-bar'>
        <ReusableBtn
          type='button'
          className='addBtn'
          styles={{ fontSize: '1.5rem' }}
        >
          Add Event
        </ReusableBtn>
      </div>
      <div className='event-container'>
        {events.map(event => (
          <div className='event' key={event.id}>
            <img src={event.logo} alt='event logo' />
            <div className='event-info'>
              <div className='event-controls'>
                <FaPencilAlt
                  className='edit-icon'
                  onClick={() => handleEdit(event.id)}
                />
                <FaTrash
                  className='delete-icon'
                  onClick={() => handleDelete(event.id)}
                />
              </div>

              {editMode === event.id ? (
                <>
                  <div className='input-cont'>
                    <input
                      placeholder='Title'
                      type='text'
                      value={event.title}
                      onChange={e =>
                        handleChange(event.id, 'title', e.target.value)
                      }
                    />
                    <DatePicker
                      selected={new Date(event.date)}
                      onChange={date =>
                        date &&
                        handleChange(
                          event.id,
                          'date',
                          date.toISOString().split('T')[0]
                        )
                      }
                    />
                    <input
                      type='text'
                      value={event.time}
                      onChange={e =>
                        handleChange(event.id, 'time', e.target.value)
                      }
                    />
                    <input
                      placeholder='Location'
                      type='text'
                      value={event.location}
                      onChange={e =>
                        handleChange(event.id, 'location', e.target.value)
                      }
                    />
                    <textarea
                      placeholder='Description'
                      value={event.description}
                      onChange={e =>
                        handleChange(event.id, 'description', e.target.value)
                      }
                    />
                    <div style={{fontSize: '.9rem', marginBottom: '1rem'}}>
                      <Select
                        styles={{
                          multiValue: base => ({
                            ...base,
                            fontSize: '.8rem'
                          }),
                          menu: base => ({
                            ...base,
                            fontSize: '.8rem',
                            zIndex:10
                          }),
                        }}
                        isMulti
                        options={skillOptions}
                        value={event.skills.map(skill => ({
                          value: skill,
                          label: skill
                        }))}
                        onChange={(selected: MultiValue<Skill>) =>
                          handleChange(
                            event.id,
                            'skills',
                            selected.map(skill => skill.value)
                          )
                        }
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h2>{event.title}</h2>
                  <h4>
                    {event.date} at {event.time}
                  </h4>
                  <h4>{event.location}</h4>
                  <p>{event.description}</p>
                  <ul>
                    Skills:
                    {event.skills.map(skill => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EventManagement
