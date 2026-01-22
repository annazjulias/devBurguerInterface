import logo from "../../assets/logo.svg";
import { CartItens, CartResume } from "../../components";
import { Banner, Container, Content, Title } from "./styled";

export function Cart() {
  return(
 <Container>
  <Banner>
    <img src={logo} alt="logo dev club" />
  </Banner>
  <Title>Checkout - Pedidos</Title>
  <Content>
  <CartItens />
  <CartResume />
  </Content>
 </Container>
  )
}