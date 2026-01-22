import Cart from '../../assets/Vector.svg'
import { ContainerButton } from './styles'

export function CartButon({ ...props }) {
  return (
    <ContainerButton {...props}>
      <img src={Cart} alt='carrinho-de-compras' />
    </ContainerButton>
  )
}