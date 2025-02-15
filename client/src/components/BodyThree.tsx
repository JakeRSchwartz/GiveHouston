import styled from 'styled-components'
import '../styles/body.styles.css'
import aboutImage from '../assets/charity.jpg'
function BodyThree() {
  return (
    <div className='body-three'>
        <BodyThreeLeft>
            <UserDiv>
                <SmallHeader>
                    More than 100,000 Houstonians depend on Give Houston each year
                </SmallHeader>
                <h3 style={{ padding: '0 5rem 0 5rem' }}>
                    "Being able to reach out to Give Houston with just a computer is nothing, but 
                    effortless. I am able to log into this website and get the help I need immediately."
                     - Jodi, Event Coordinator
                </h3>
            </UserDiv>
        </BodyThreeLeft>
        <BodyThreeRight>
            <img src={aboutImage} alt='Houston skyline' />
        </BodyThreeRight>
    </div>
  )
}

export default BodyThree

const SmallHeader = styled.h2`
  font-size: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 5rem 0 5rem;
  margin-bottom: 1rem;
`

const BodyThreeRight = styled.div`
  width: 40%;

  & img {
    max-height: 850px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
const BodyThreeLeft = styled.div`
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
