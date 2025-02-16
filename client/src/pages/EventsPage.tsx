import '../styles/eventspage.styles.css'
import charity from '../assets/charity.jpg'
import charimg from '../assets/charity2.jpg'
import ReusableBtn from '../components/reusable.cont/ReusableBtn'
import { useEffect, useState } from 'react'

const EventsPage = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const events = [
    {
      id: 1,
      logo: charity,
      title: 'Community Clean-Up Drive',
      location: 'Central Park, New York, NY',
      time: '9:00 AM - 12:00 PM',
      description:
        'Join us in making our community cleaner and greener! Volunteers will help pick up litter, plant trees, and educate others about sustainability.',
      skillsNeeded: ['Teamwork', 'Physical Stamina', 'Environmental Awareness'],
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
      skillsNeeded: ['Organization', 'Communication', 'Lifting Heavy Items'],
      date: '2024-04-10'
    },
    {
      id: 3,
      logo: 'https://example.com/logo3.png',
      title: 'STEM Workshop for Kids',
      location: 'Tech Innovation Hub, San Francisco, CA',
      time: '1:00 PM - 4:00 PM',
      description:
        'Teach young minds about science, technology, engineering, and math. Volunteers will lead hands-on experiments and mentor students.',
      skillsNeeded: ['Teaching', 'STEM Knowledge', 'Public Speaking'],
      date: '2024-05-05'
    },
    {
      id: 4,
      logo: 'https://example.com/logo4.png',
      title: 'Animal Shelter Volunteering',
      location: 'Happy Paws Animal Shelter, Chicago, IL',
      time: '11:00 AM - 3:00 PM',
      description:
        'Support our furry friends by helping with feeding, cleaning, and socializing animals awaiting adoption.',
      skillsNeeded: ['Compassion', 'Animal Care', 'Patience'],
      date: '2024-06-20'
    },
    {
      id: 5,
      logo: 'https://example.com/logo5.png',
      title: 'Mental Health Awareness Seminar',
      location: 'Wellness Center, Los Angeles, CA',
      time: '2:00 PM - 5:00 PM',
      description:
        'Assist in organizing and promoting a seminar focused on mental health awareness and well-being.',
      skillsNeeded: ['Event Planning', 'Public Relations', 'Empathy'],
      date: '2024-07-12'
    },
    {
      id: 6,
      logo: 'https://example.com/logo6.png',
      title: 'Coding Bootcamp for Beginners',
      location: 'Tech Academy, Seattle, WA',
      time: '9:00 AM - 3:00 PM',
      description:
        'Help individuals kickstart their tech careers by teaching the basics of programming and software development.',
      skillsNeeded: ['Programming', 'Mentorship', 'Problem-Solving'],
      date: '2024-08-30'
    }
  ]

interface Event {
  id: number;
  logo: string;
  title: string;
  location: string;
  time?: string;
  description: string;
  skillsNeeded: string[];
  date: string;
}
const [sortedEvents, setSortedEvents] = useState<Event[]>([])
useEffect(() => {
  // Sort events by both date and time
  const sorted = [...events].sort((a, b) => {
    const dateTimeA = new Date(`${a.date} ${a.time}`).getTime()
    const dateTimeB = new Date(`${b.date} ${b.time}`).getTime()
    return dateTimeA - dateTimeB
  })
  setSortedEvents(sorted)
}, [])



  return (
    <div className='main-events-div'>
      <h1>Upcoming Events</h1>
      <div className='event-container'>
        {sortedEvents.map(event => (
          <div className='event'>
            <img src={event.logo} alt='event logo' />
            <div className='event-info'>
              <h2>{event.title}</h2>
              <h4>
                {event.date} at {event.time}
              </h4>
              <h4>{event.location}</h4>
              <p>{event.description}</p>
              <ul>
                Skills:
                {event.skillsNeeded.map(skill => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
              <div className='add-btn'>
                <ReusableBtn
                  type='button'
                  className='addBtn'
                  styles={{ fontSize: '1rem' }}
                >
                  Register Now
                </ReusableBtn>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default EventsPage


