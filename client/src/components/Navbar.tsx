import styled from 'styled-components'
import { Outlet } from 'react-router-dom'
import { FaLock } from 'react-icons/fa'
import { FaUnlock } from 'react-icons/fa6'
import { FaUser } from 'react-icons/fa'
import ReusableBtn from '../components/reusable.cont/ReusableBtn'

type NavbarProps = {
  userRole: 'admin' | 'guest' | 'user'
}

const Navbar = ({ userRole }: NavbarProps) => {
  return (
    <>
      <Nav>
        <NavLogo>Logo</NavLogo>
        {userRole === 'guest' && (
          <NavLinks>
            <ReusableBtn
              type='button'
              className='submitBtn'
              styles={{ fontSize: '1.6rem' }}
            >
              Learn More
            </ReusableBtn>
            <ReusableBtn type='button' className='genericBtn'>
              <FaLock />
              Login
            </ReusableBtn>
          </NavLinks>
        )}
        {userRole === 'admin' && (
          <NavLinks>
            <ReusableBtn type='button' className='genericBtn'>
              <FaUser /> Profile
            </ReusableBtn>
            <ReusableBtn type='button' className='genericBtn'>
              <FaUnlock />
              Logout
            </ReusableBtn>
          </NavLinks>
        )}
        {userRole === 'user' && (
          <>
            <NavLinks>
              <div>Events</div>
              <div>Volunteer Matching</div>
              <div>Volunteer History</div>
            </NavLinks>
            <NavLinks>
              <ReusableBtn type='button' className='genericBtn'>
                <FaUser /> Profile
              </ReusableBtn>
              <ReusableBtn type='button' className='genericBtn'>
                <FaUnlock />
                Logout
              </ReusableBtn>
            </NavLinks>
          </>
        )}
      </Nav>
      <Container>
        <Outlet />
      </Container>
    </>
  )
}

export default Navbar

const Nav = styled.div`
  width: 100%;
  top: 0;
  position: fixed;
  z-index: 100;
  overflow: hidden;
  font-size: 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2.5rem 6rem;
  background-color: var(--main-bg-white);
  height: 5.5rem;
  font-family: 'Bebas Neue', serif;
  @media (max-width: 768px) {
    font-size: 1.2rem;
    padding: 1.5rem;
    height: 4rem;
  }
`
const NavLogo = styled.div``

const NavLinks = styled.div`
  display: flex;
  gap: 2.5rem;
  align-items: center;
`
const Container = styled.div`
  padding-top: 5.5rem;
  @media (max-width: 768px) {
    padding-top: 4rem;
  }
`
