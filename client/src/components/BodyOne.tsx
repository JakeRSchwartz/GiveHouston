import styled from 'styled-components'
import '../styles/body.styles.css'
import houstonbanner from '../assets/houston-art.jpg'
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
            <h2>REGISTER NOW</h2>
            <RegistrationForm></RegistrationForm>
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
  border: 1px solid black;
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
  border: solid red 1px;
  & img {
    width: 100%;
    height: 100%;
  }
`
const BodyOneRight = styled.div`
  display: flex;
  flex-direction: column;
  border: solid green 1px;
  align-items: center;
  width: 60%;
`
const RegistrationDiv = styled.div`
  display: flex;
  flex-direction: column;
  border: solid orange 2px;
  width: 90%;
  padding: 2rem;
  & h2 {
    margin: 0 auto 0 auto;
  }
`
const RegistrationForm = styled.div`
  background-color: var(--secondary-red);
  border-radius: 0.2rem;
  padding: 2rem;
`
