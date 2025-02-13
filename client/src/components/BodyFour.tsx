import styled from 'styled-components'
import '../styles/body.styles.css'
import aboutImage2 from '../assets/charity2.jpg'
function BodyFour() {
  return (
    <div className='body-four'>
        <BodyFourLeft>
            <UserDiv>
                <SmallHeader>
                    ????
                </SmallHeader>
                <h3 style={{ padding: '0 5rem 0 5rem' }}>
                    ?????
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
  background-color: rgb(200,200,200);
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
