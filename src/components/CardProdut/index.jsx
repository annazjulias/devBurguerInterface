import PropTypes from "prop-types"
import { Container, CardImg } from "./styles"
import { CartButon } from "../CartButon"
import { useCart } from "../../hooks/cartcontext"


export function CardProduct({ product }) {
const { putProductInCart } = useCart();
  return (
    <Container>
      <CardImg src={product.url} alt={product.name} />
      <div>
        <p>{product.name}</p>
        <strong>{product.currencyValue}</strong>
      </div>
      <CartButon onClick={ () => putProductInCart(product)
      }></CartButon>
    </Container>
  )
}

CardProduct.propTypes = {
  product: PropTypes.object,
}