import { Container, LinkContainer, Logout, Navigation, Options, Profile, HederLink, Content } from "./styles";
import usuario from "../../assets/usuariologo.png"
import pedidos from "../../assets/pedidos.png"
import logo from "../../assets/logo.svg"
import { useNavigate, useResolvedPath } from "react-router-dom";
import { useUser } from "../../hooks/usercontext"

export function Heder() {
  const navigate = useNavigate();
  const { pathname } = useResolvedPath();
  const { logout, userInfo } = useUser();

  function logalteuser() {
logout();
    navigate("/login");
  }

  return (
    <Container>
      <Content>
        <Navigation>
          <img src={logo} alt="logo do food explorer" />
          <div>
            <HederLink to="/" $isActive={pathname === '/'}>
              Home
            </HederLink>
            <hr></hr>
            <HederLink to="/Cardapio" $isActive={pathname === '/Cardapio'}>
              Cardapio
            </HederLink>
          </div>
        </Navigation>
        <Options>
          <Profile>
            <img src={usuario} alt="ícone de usuário" />
            <div>
              <p>Olá, <span>{userInfo.name}</span></p>
              <Logout onClick={logalteuser}>sair</Logout>
            </div>

          </Profile>
          <LinkContainer>
            <img src={pedidos} alt="ícone de carrinho de compras" />
            <HederLink to="/Carrinho" $isActive={pathname === '/Carrinho'}>Pedidos</HederLink>
          </LinkContainer>
        </Options>


      </Content>
    </Container>
  )
}