import styled from 'styled-components'
import { Outlet } from 'react-router-dom'

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
          <div>About</div>
          <div>Login</div>
        </NavLinks>
      )}
      {userRole === 'admin' && <NavLinks>Admin</NavLinks>}
    </Nav>
    <Container>
    <Outlet/>
    </Container>
    </>
    
  )
}

export default Navbar

const Nav = styled.div`
width: 100%;
top:0;
position: fixed;
z-index: 100;
overflow: hidden;
font-size: 1.5rem;
display: flex;
justify-content: space-between;
align-items: center;
padding:2rem;
background-color: var(--main-bg-white);
height:6rem;
font-weight: 400;

`
const NavLogo = styled.div``

const NavLinks = styled.div`
display: flex;
gap: 1.2rem;
`
const Container = styled.div`
padding-top: 6rem;`
