import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";

const CheckoutForm = ({ price, title }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);

      const cardElement = elements.getElement(CardElement);

      const stripeResponse = await stripe.createToken(cardElement);

      if (stripeResponse.error) {
        throw new Error(stripeResponse.error.message);
      }

      const stripeToken = stripeResponse.token.id;

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          stripeToken: stripeToken,
          title: title,
          amount: price * 100,
        }
      );

      setIsLoading(false);

      if (response.data.status === "succeeded") {
        setPaymentCompleted(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Formulaire de paiement</h1>
      <CardElement />
      {paymentCompleted === true ? (
        <p>Paiement Complété</p>
      ) : (
        <button className="button-primary" type="submit" disabled={isLoading}>
          {isLoading ? "En cours..." : "Payez"}
        </button>
      )}
    </form>
  );
};

export default CheckoutForm;
