import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import RegistrationPage from './pages/RegistrationPage'
import Navbar from './components/Navbar'
import EventCreationPage from './pages/EventCreationPage'
function App () {
  type role = 'admin' | 'guest' | 'user'
  const userRole: role = 'guest'
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navbar userRole={userRole} />}>
          <Route index element={<Home userRole={userRole}/>} />
          <Route path='register' element={<RegistrationPage/>} />
          <Route path="event" element={<EventCreationPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
