import './App.css'
import BodyOne from './components/BodyOne'
import BodyTwo from './components/BodyTwo'

interface HomeProps {
  userRole: string;
}
function Home ({userRole}: HomeProps) {
  return(
      <><BodyOne role={userRole}/><BodyTwo/></>
  )

}

export default Home




