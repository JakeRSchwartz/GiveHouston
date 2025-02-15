import styled from 'styled-components'
import '../styles/body.styles.css'
import aboutImage2 from '../assets/charity2.jpg'
function BodyFour() {
  return (
    <div className='body-four'>
        <BodyFourLeft>
            <UserDiv>
                <SmallHeader>
                    Our Future: Building a Better Tomorrow
                </SmallHeader>
                <h3 style={{ padding: '0 5rem 0 5rem' }}>
                    At Give Houston, we are driven by a powerful vision: 
                    a future where every person has access to medical care, 
                    housing, food, and other support. Our journey is far from over, 
                    and with your support, we are laying the foundation for a 
                    brighter Tomorrow.
                </h3>
                <SmallHeader2>
                    How can I make a big difference as of today?
                </SmallHeader2>
                <h3 style={{ padding: '0 5rem 0 5rem' }}>
                    Our future depends on people like you, those who are determined to 
                    creating a lasting change, Together, we can make these goals a reality. 
                    Whether it's through donations, volunteering, or sharing our message, 
                    your support plays a crucial role in shaping a better tomorrow.
                </h3>
                
            </UserDiv>
        </BodyFourLeft>
        <BodyFourRight>
            <img src={aboutImage2} alt='Houston skyline' />
        </BodyFourRight>
    </div>
  )
}

export default BodyFour

const SmallHeader = styled.h2`
  font-size: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 5rem 0 5rem;
  margin-bottom: 1rem;
`
const SmallHeader2 = styled.h2`
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5rem 5rem 0 5rem;
  margin-bottom: 1rem;
`

const BodyFourRight = styled.div`
  width: 40%;

  & img {
    max-height: 850px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
const BodyFourLeft = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgb(95, 113, 89);
  align-items: center;
  width: 60%;
`
const UserDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
  width: 90%;
  padding: 2rem;
  border-radius: .3rem;

  & h2 {
    margin: 0 auto 0 auto;
  }
`
