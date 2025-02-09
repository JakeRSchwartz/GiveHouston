import styled from 'styled-components'
import '../styles/body.styles.css'
import bulletImage from '../assets/bullet-images.png'
function BodyTwo() {
  return (
    <div className='body-two'>
      <BodyTwoLeft>
        <UserDiv>
          <SmallHeader>
            Why Give Houston?
          </SmallHeader>
          <h3 style={{ padding: '0 5rem 0 5rem' }}>
            Give Houston provides a convenient way to manage charitable projects you desire.
            Through our easy-access software, you can create, remove, and manage your projects
            anyway you want. We believe in the importance of your organization and strive to provide
            you with the best possible service to make your dream a success.
          </h3>
        </UserDiv>
      </BodyTwoLeft>
        <BodyTwoRight>
            <img src={bulletImage} alt='Houston skyline' />
        </BodyTwoRight>
    </div>
  )
}

export default BodyTwo

const SmallHeader = styled.h2`
  font-size: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 5rem 0 5rem;
  margin-bottom: 1rem;
`

const BodyTwoRight = styled.div`
  width: 40%;
  border: solid #cac0bc 1px;

  & img {
    max-height: 850px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
const BodyTwoLeft = styled.div`
  display: flex;
  flex-direction: column;
  border: solid black 1px;
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
  background-color: #bdc5c6;
  border-radius: .3rem;

  & h2 {
    margin: 0 auto 0 auto;
  }
`
