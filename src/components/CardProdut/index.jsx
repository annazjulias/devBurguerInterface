import PropTypes from "prop-types"
import { Container, CardImg } from "./styles"
import { CartButon } from "../CartButon"


export function CardProduct({ product }) {

  return (
    <Container>
      <CardImg src={product.url} alt={product.name} />
      <div>
        <p>{product.name}</p>
        <strong>{product.currencyValue}</strong>
      </div>
      <CartButon></CartButon>
    </Container>
  )
}

CardProduct.propTypes = {
  product: PropTypes.object,
}