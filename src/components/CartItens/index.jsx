import { useCart } from "../../hooks/cartcontext";
import { formatPice } from "../../utils/FormatPrice";
import { Table } from "../index";
import { ButtonGrup, EmptCart, ProductImage, FormatTotalprice, TrashImg } from "./style";
import Thash from '../../assets/trash.svg'

export function CartItens() {
  const { cartProduts, incrementProductQuantity, decrementProductQuantity, deleteProductFromCart } = useCart();

  return (
    <Table.Root>
      <Table.Heder>
        <Table.Tr>
          <Table.Th></Table.Th>
          <Table.Th>Itens</Table.Th>
          <Table.Th>Preço</Table.Th>
          <Table.Th>Quantidade</Table.Th>
          <Table.Th>Total</Table.Th>
                    <Table.Th></Table.Th>

        </Table.Tr>
      </Table.Heder>
      <Table.Body>
        {cartProduts?.length ? (
          cartProduts.map((product) => (
            <Table.Tr key={product.id}>
              <Table.Td>
                <ProductImage src={product.url} alt={product.name} />
              </Table.Td>
              <Table.Td>{product.name}</Table.Td>
              <Table.Td>R$ {product.currencyValue}</Table.Td>
              <Table.Td>
                <ButtonGrup>
                  <button onClick={() => decrementProductQuantity(product.id)}>-</button>
                  {product.quantity}
                  <button onClick={() => incrementProductQuantity(product.id)}>+</button>
                </ButtonGrup>
              </Table.Td>
              <Table.Td>
                <FormatTotalprice>{formatPice(product.price * product.quantity)}</FormatTotalprice>
                </Table.Td>
                <Table.Td>
                  <TrashImg src={Thash} alt="lixeira" onClick={() => deleteProductFromCart(product.id)} />
                </Table.Td>
             
            </Table.Tr>
          ))
        ) : (
          <EmptCart> Carrinho vazio</EmptCart>


        )}
      </Table.Body>

    </Table.Root>)
}
