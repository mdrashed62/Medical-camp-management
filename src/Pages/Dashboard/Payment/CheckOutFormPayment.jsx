import { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext } from "react";
import useAxiosSecure from "../../../Components/Hooks/Secure/useAxiosSecure";
import { AuthContext } from "../../../Providers/AuthProviders";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckOutFormPayment = ({ fees, campId, campName, onPaymentSuccess }) => {
  const { user } = useContext(AuthContext);
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (fees > 0) {
      axiosSecure.post("/create-payment-intent", { price: fees }).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [axiosSecure, fees]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("Payment error", error);
      setError(error.message);
    } else {
      console.log("Payment method", paymentMethod);
      setError("");
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      }
    );

    if (confirmError) {
      console.log("confirm error");
    } else {
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);

        const payment = {
          email: user?.email,
          transactionId: paymentIntent.id,
          price: fees,
          date: new Date(),
          campId: campId,
          campName: campName,
        };

        axiosSecure.post("/payments", payment).then((res) => {
          if (res.data.insertedId) {
            axiosSecure.put(`/update-payment-status/${campId}`).then((res) => {
              if (res.data.modifiedCount > 0) {
                Swal.fire({
                  title: "Success!",
                  text: "Payment successful",
                  icon: "success",
                  confirmButtonText: "OK",
                });
                onPaymentSuccess(campId);
                navigate("/dashboard/registeredCamps");
              }
            });
          }
        });
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn bg-green-400 w-[200px] px-4 text-white py-2 mt-4"
          type="submit"
          disabled={!stripe}
        >
          Pay
        </button>
      </form>
      {error && <p className="text-red-600">{error}</p>}
      <p>Transaction Id: {transactionId}</p>
    </div>
  );
};

export default CheckOutFormPayment;
