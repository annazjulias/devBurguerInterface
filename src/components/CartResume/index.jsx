import { Button } from '../index';
import { Container } from './styles';
import { toast } from 'react-toastify';
import { use, useEffect, useState } from 'react';
import { api } from '../../services/api';
import { formatPice } from '../../utils/FormatPrice';
import { useCart } from '../../hooks/cartcontext';
import { useNavigate } from 'react-router-dom';


export function CartResume() {
  const [cartTotal, setCartTotal] = useState(0);
  const [deliveryTax] = useState(500);
  const { cartProduts, clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const sumAllItens = cartProduts.reduce((acc, current) => {
      return current.price * current.quantity + acc;
    }, 0);
    setCartTotal(sumAllItens);
  }, [cartProduts]);

  const submitOrder = async () => {
    // ✅ Mapeando para 'id' em vez de 'product_id'
    const items = cartProduts.map((product) => {
      return {
        id: product.id,
        quantity: product.quantity,
        price: product.price,
      }
    });
  
    try {
      // ✅ Endpoint correto e enviando 'items'
      const {data} = await api.post('/create-payment-intent', { items });
      navigate('/checkout', { 
        state: data,
      });
      toast.success('Pagamento processado com sucesso!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
    } catch (error) {
      console.error('Erro:', error);
      toast.error('Falha ao processar o pagamento, tente novamente!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
  return (
    <div>
      <Container>
        <div className="container-top">
          <h2 className='resumo'>Resumo do pedido</h2>
          <p className='itens'>Itens</p>
          <p className='valor'>{formatPice(cartTotal)}</p>
          <p className='taxa'>Taxa de Entrega</p>
          <p className='valortaxa'> {formatPice(deliveryTax)}</p>
        </div>
        <div className="container-bottom">
          <p>Total</p>
          <p>{formatPice(cartTotal + deliveryTax)}</p>
        </div>
      </Container>
      <Button onClick={submitOrder} >Finalizar Pedido</Button>
    </div>
  )
}