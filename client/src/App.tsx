
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import RegistrationPage from './pages/RegistrationPage'
import Navbar from './components/Navbar'
import ProfilePage from './pages/ProfilePage'
import VolunteerHistory from './components/user.comp/VolunteerHistoryTable'
function App () {
  type role = 'admin' | 'guest' | 'user'
  const userRole: role = 'admin'
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navbar userRole={userRole} />}>
          <Route index element={<Home userRole={userRole}/>} />
          <Route path='register' element={<RegistrationPage/>} />
          <Route path='profile' element={<ProfilePage/>} />

          {/* Admin Routes - will make protected when backend auth is set */}
          <Route path='VolunteerHistory' element={<VolunteerHistory/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
