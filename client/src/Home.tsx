import './App.css'
import BodyOne from './components/BodyOne'

interface HomeProps {
  userRole: string;
}
function Home ({userRole}: HomeProps) {
  return(
    <BodyOne role={userRole}/>
  )
}

export default Home




