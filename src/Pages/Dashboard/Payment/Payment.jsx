import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CheckOutFormPayment from "./CheckOutFormPayment";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  const { id } = useParams();
  const [camp, setCamp] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/registeredCamps/${id}`)
      .then((res) => res.json())
      .then((data) => setCamp(data));
  }, [id]);

  const handlePaymentSuccess = () => {
    setCamp((prevCamp) => ({
      ...prevCamp,
      paymentStatus: "Paid",
    }));
  };

  if (!camp) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <h1 className="text-center text-5xl">Payment</h1>
      </div>
      <div>
        <Elements stripe={stripePromise}>
          <CheckOutFormPayment
            campName={camp.campName}
            campId={camp._id}
            fees={camp.fees}
            onPaymentSuccess={handlePaymentSuccess}
          />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
