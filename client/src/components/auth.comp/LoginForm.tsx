import styled from 'styled-components'
import ReusableBtn from '../reusable.cont/ReusableBtn'
import { Link } from 'react-router-dom'


interface LoginProps {
  isOpen: boolean
  onClose: () => void
}

const LoginForm = ({isOpen, onClose}: LoginProps) => {
  if (!isOpen) return null

  return (
    <LoginContainer>
      <h1 style={{ marginBottom: '1rem' }}>Login</h1>
      <form>
        <FormGroup>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' name='email' />
        </FormGroup>
        <FormGroup>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' name='password' />
        </FormGroup>
        <ReusableBtn
          styles={{ margin: 'auto', fontSize: '1.5rem' }}
          type='submit'
          className='submitBtn'
        >
          Login
        </ReusableBtn>
      </form>
      <span onClick={onClose} style={{ marginTop:'1rem'}}>Dont have an account? <Link to='/register'>Register</Link></span>
    </LoginContainer>
  )
}

export default LoginForm

const LoginContainer = styled.div`
  max-width: 700px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  label {
    font-size: 1.2rem;
    font-weight: bold;
    color: var(--font-black);
  }
  input {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
    border: solid 1px var(--font-black);
    outline: none;
  }
`
const FormGroup = styled.div`
  width: 100%;
  min-width: 330px;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`
