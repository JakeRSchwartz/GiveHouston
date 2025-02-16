
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import RegistrationPage from './pages/RegistrationPage'
import Navbar from './components/Navbar'
import ProfilePage from './pages/ProfilePage'
import VolunteerHistory from './components/user.comp/VolunteerHistoryTable'
import EventsPage from './pages/EventsPage'
import EventManagment from './pages/admin/EventManagment'
function App () {
  type role = 'admin' | 'guest' | 'user'
  const userRole: role = 'guest'
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navbar userRole={userRole} />}>
          <Route index element={<Home userRole={userRole}/>} />
          <Route path='register' element={<RegistrationPage/>} />
          <Route path='profile' element={<ProfilePage/>} />
          <Route path='events' element={<EventsPage/>} />

          {/* Admin Routes - will make protected when backend auth is set */}
          <Route path='VolunteerHistory' element={<VolunteerHistory/>} />
          <Route path='eventManagement' element={<EventManagment/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
