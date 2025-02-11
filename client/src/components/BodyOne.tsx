import styled from 'styled-components'
import '../styles/body.styles.css'
import houstonbanner from '../assets/houston-art.jpg'
import ReusableBtn from '../components/reusable.cont/ReusableBtn'
import {Link} from 'react-router-dom'
interface BodyOneProps {
  role: string
}
const BodyOne = ({ role }: BodyOneProps) => {
  return (
    <div className='body-one'>
      <BodyOneLeft>
        <img src={houstonbanner} alt='Houston skyline' />
      </BodyOneLeft>
      <BodyOneRight>
        <HeaderDiv>
          <SmallHeader>
            GIVE BACK TO THE COMMUNITY YOU LOVE - GIVE HOUSTON
          </SmallHeader>
          <h3 style={{ padding: '0 5rem 0 5rem' }}>
            Thanks to the generosity of our community, families in Houston never
            have to worry about the cost of essential services. Whether it’s
            medical care, housing, food, or support, we ensure that those in
            need receive help without financial burden—so they can focus on
            rebuilding their lives and securing a better future.
          </h3>
        </HeaderDiv>
        {role === 'guest' && (
          <RegistrationDiv>
            <h1>REGISTER NOW</h1>
            <Link to='/register' style={{ textDecoration: 'none' }}>
              <ReusableBtn
                type='button'
                className='submitBtn'
                styles={{ fontSize: '4rem'}}
              >
                CLICK HERE
              </ReusableBtn>
            </Link>
          </RegistrationDiv>
        )}
      </BodyOneRight>
    </div>
  )
}

export default BodyOne

const HeaderDiv = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 4rem 0 0 0;
`

const SmallHeader = styled.h2`
  font-size: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 5rem 0 5rem;
  margin-bottom: 1rem;
`

const BodyOneLeft = styled.div`
  width: 40%;
  border: solid black 1px;
  & img {
    max-height: 850px;
    width: 100%;
    height: 100%;
  }
`
const BodyOneRight = styled.div`
  display: flex;
  flex-direction: column;
  border: solid black 1px;
  align-items: center;
  width: 60%;
`
const RegistrationDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
  width: 90%;
  padding: 2rem;

  & h2 {
    margin: 0 auto 0 auto;
  }
`
