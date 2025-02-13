import './App.css'
import BodyOne from './components/BodyOne'
import BodyTwo from './components/BodyTwo'
import BodyThree from './components/BodyThree'


interface HomeProps {
  userRole: string
}
function Home ({ userRole }: HomeProps) {
  return (
    <>
      <BodyOne role={userRole} />
      <BodyTwo />
      <BodyThree />
    </>
  )
}

export default Home
