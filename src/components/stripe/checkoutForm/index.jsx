import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles.css"
import { useCart } from "../../../hooks/cartcontext";
import { toast } from "react-toastify";
import { api } from "../../../services/api";
import { CompletePayment } from "../../index";
export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const navigate = useNavigate();
  const { cartProduts, clearCart } = useCart();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.error("Falha tente novamente");
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });

    if (error) {
      if (error.type === "card_error") {
        setMessage(error.message);
      } else {
        setMessage("Um erro inesperado ocorreu.");
      }
      console.log(error);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      setMessage("Pagamento realizado com sucesso!");

      try {
        const products = cartProduts.map((product) => {
          return {
            id: product.id,
            quantity: product.quantity,
            price: product.price,
          };
        });

        const { status } = await api.post('/orders', {
          products
        },
          { validateStatus: () => true });

        if (status === 200 || status === 201) {
          
          toast.success("Pedido realizado com sucesso!");
          setTimeout(() => {
            navigate(`/completePayment?payment_intent_client_secret=${paymentIntent.client_secret}`);
          }, 3000);
          clearCart();
        } else if (status === 409) {
          toast.error("Erro ao processar o pedido. Tente novamente.");
        } else {
          throw new Error();
        }
      } catch (error) {
        console.error("Erro ao criar o pedido:", error);
        toast.error("Erro ao processar o pedido. Tente novamente.");
      }
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "accordion"
  };

  return (
    <div className="container">
      <form className="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button disabled={isLoading || !stripe || !elements} id="submit" className="button">
          <span id="button-text">
            {isLoading ? <div className="spinner" id="spinner"></div> : "Pagar Agora"}
          </span>
        </button>
        {message && <div id="payment-message">{message}</div>}
      </form>
    </div>
  );
}