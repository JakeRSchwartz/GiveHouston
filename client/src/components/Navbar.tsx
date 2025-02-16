import styled from 'styled-components'
import { Link, Outlet } from 'react-router-dom'
import { FaLock } from 'react-icons/fa'
import { FaUnlock } from 'react-icons/fa6'
import { FaUser } from 'react-icons/fa'
import ReusableBtn from '../components/reusable.cont/ReusableBtn'
import { useState } from 'react'
import ReusableModal from './reusable.cont/ReusableModal'
import LoginForm from './auth.comp/LoginForm'

type NavbarProps = {
  userRole: 'admin' | 'guest' | 'user'
}

const Navbar = ({ userRole }: NavbarProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [isTooltipVisible, setTooltipVisible] = useState<boolean>(false)

  const handleNotificationClick = () => {
    setTooltipVisible(!isTooltipVisible)
  }

  return (
    <>
      <Nav>
        <NavLink
          to='/'
          style={{
            textDecoration: 'none',
            color: '#000000',
            cursor: 'pointer'
          }}
        >
          <NavLogo>Logo</NavLogo>
        </NavLink>
        {userRole === 'guest' && (
          <NavLinks>
            <ReusableBtn
              type='button'
              className='submitBtn'
              styles={{ fontSize: '1.6rem' }}
            >
              Learn More
            </ReusableBtn>
            <ReusableBtn
              type='button'
              className='genericBtn'
              onClick={() => setOpenModal(true)}
            >
              <FaLock />
              Login
            </ReusableBtn>
          </NavLinks>
        )}
        {userRole === 'admin' && (
          <>
            <NavLinks>
              <MiddleLink>Events</MiddleLink>
              <MiddleLink>Event Matching</MiddleLink>
              <NavLink
                to='VolunteerHistory'
                style={{ textDecoration: 'none', color: '#000000' }}
              >
                <MiddleLink>Volunteer History</MiddleLink>
              </NavLink>
            </NavLinks>

            <NavLinks>
              <ColumnContainer>
                <ReusableBtn
                  type='button'
                  className='genericBtn'
                  onClick={handleNotificationClick}
                >
                  <NotificationContainer>
                    <span>Notification</span>
                    <NotificationBadge>3</NotificationBadge>
                  </NotificationContainer>
                </ReusableBtn>
                <Tooltipdiv>
                  {isTooltipVisible && (
                    <>
                      <Tooltip>Notification 1</Tooltip>
                      <Tooltip>Notification 2</Tooltip>
                      <Tooltip>Notification 3</Tooltip>
                    </>
                  )}
                </Tooltipdiv>
              </ColumnContainer>
              <NavLink to='/profile' style={{ textDecoration: 'none' }}>
                <ReusableBtn type='button' className='genericBtn'>
                  <FaUser /> Profile
                </ReusableBtn>
              </NavLink>
              <ReusableBtn type='button' className='genericBtn'>
                <FaUnlock />
                Logout
              </ReusableBtn>
            </NavLinks>
          </>
        )}
        {userRole === 'user' && (
          <>
            <NavLinks>
              <MiddleLink>Events</MiddleLink>
              <MiddleLink>Your History</MiddleLink>
            </NavLinks>
            <NavLinks>
              <ColumnContainer>
                <ReusableBtn
                  type='button'
                  className='genericBtn'
                  onClick={handleNotificationClick}
                >
                  <NotificationContainer>
                    <span>Notification</span>
                    <NotificationBadge>3</NotificationBadge>
                  </NotificationContainer>
                </ReusableBtn>
                <Tooltipdiv>
                  {isTooltipVisible && (
                    <>
                      <Tooltip>Notification 1</Tooltip>
                      <Tooltip>Notification 2</Tooltip>
                      <Tooltip>Notification 3</Tooltip>
                    </>
                  )}
                </Tooltipdiv>
              </ColumnContainer>
              <NavLink to='/profile' style={{ textDecoration: 'none' }}>
                <ReusableBtn type='button' className='genericBtn'>
                  <FaUser /> Profile
                </ReusableBtn>
              </NavLink>
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
        <ReusableModal isOpen={openModal} onClose={() => setOpenModal(false)}>
          <LoginForm isOpen={openModal} onClose={() => setOpenModal(false) }/>
        </ReusableModal>
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
  box-shadow: 0 16px 16px rgba(0, 0, 0, 0.2);
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
const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  align-items: center;
`
const NotificationContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const NotificationBadge = styled.div`
  position: absolute;
  top: -15px;
  right: -35px;
  width: 20px;
  height: 20px;
  background-color: red;
  color: white;
  border-radius: 50%;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Tooltip = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 1rem;
  white-space: nowrap;
`

const Tooltipdiv = styled.div`
  display: flex;
  position: fixed;
  flex-direction: column;
  margin-top: 2.5rem;
  z-index: 200;
  gap: 0.2rem;
`
const MiddleLink = styled.div`
  color: #000000;
`
const NavLink = styled(Link)`
  color: #000000;
  text-decoration: none;
  cursor: pointer;
`
