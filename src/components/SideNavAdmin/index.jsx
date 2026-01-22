import { SignOutIcon } from '@phosphor-icons/react/dist/ssr'
import Logo from '../../assets/logo.svg'
import { navLinksAdmin } from './navLinks'
import { Container, Footer, NavLinkContainer, NavLinks, } from "./styled"
import { useUser } from '../../hooks/usercontext'
import { useResolvedPath } from 'react-router-dom'

export function SideNavAdmin() {
  const { logout } = useUser();
  const { pathname } = useResolvedPath();
  return (
    <Container>
      <img src={Logo} alt="logo-dev-burguer" />
      <NavLinkContainer>
        {navLinksAdmin.map(link => (
          <NavLinks
            key={link.id}
            to={link.path}
            $isActive={link.path  === pathname}
          >
            {link.icon}
            <span>{link.label}</span>
          </NavLinks>
          
        ))}             

      </NavLinkContainer>
      <Footer>
        <NavLinks to="/login">
          <SignOutIcon />
          <span onClick={logout}>sair</span>
        </NavLinks>
      </Footer>
    </Container>
  )
}