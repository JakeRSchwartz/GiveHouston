
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Navbar from './components/Navbar'
function App () {
  type role = 'admin' | 'guest' | 'user'
  const userRole: role = 'guest'
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navbar userRole={userRole} />}>
          <Route index element={<Home userRole={userRole}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
