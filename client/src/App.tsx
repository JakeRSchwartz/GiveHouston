
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import RegistrationPage from './pages/RegistrationPage'
import Navbar from './components/Navbar'
import ProfilePage from './pages/ProfilePage'
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
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
