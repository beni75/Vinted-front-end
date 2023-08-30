import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../components/checkoutForm";

const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

const Payment = () => {
  const location = useLocation();
  const { title, price } = location.state;

  const protectionBuyersPrice = 0.8;
  const fraisDePort = 0.4;
  const total = (price + protectionBuyersPrice + fraisDePort).toFixed(2);

  return (
    <section className="section-payment">
      <div className="payment-wrapper">
        <h3>Résumé de la commande</h3>
        <p>Commande {price} €</p>
        <p>Frais protection acheteurs {protectionBuyersPrice} €</p>
        <p>Frais de port {fraisDePort} €</p>
        <p>Total {total} €</p>
        <p>
          Il ne vous reste plus qu'une étape pour vous offrir{" "}
          <strong>{title}</strong>. Vous allez payer <strong>{total}€</strong>
          (frais de protections et frais de port inclus).
        </p>
        <Elements stripe={stripePromise}>
          <CheckoutForm price={total} title={title} />
        </Elements>
      </div>
    </section>
  );
};

export default Payment;
