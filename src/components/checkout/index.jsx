import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import stripePromise from "../../config/stripeConfig";
import CheckoutForm from "../stripe/checkoutForm";

export function Checkout() {
  const location = useLocation();
  const clientSecret = location.state?.clientSecret;

  if (!clientSecret) {
    return <div>Erro, tente novamente</div>;
  }

  console.log(clientSecret);
  
  const options = {
    clientSecret,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
}