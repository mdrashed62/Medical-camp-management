import {  CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import {  useEffect, useState } from "react";
import useCamps from "../../../Components/Hooks/useCamps";
import useAxiosSecure from "../../../Components/Hooks/Secure/useAxiosSecure";




const CheckOutForm = () => {
    const stripe = useStripe();
    const [clientSecret, setClientSecret] = useState('')
    const elements = useElements();
    const [error, setError] = useState('');
    const axiosSecure = useAxiosSecure();
    const [camps] = useCamps();
    const totalPrice = camps.reduce((total, item) => total + item.fees, 0)
 
    useEffect(() => {
    axiosSecure.post('/create-payment-intent', {fees: totalPrice})
    .then(res => {
      console.log(res.data.clientSecret);
      setClientSecret(res.data.clientSecret);
    })
    }, [axiosSecure, totalPrice])

    
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        if(!stripe || !elements){
            return
        }

        const card = elements.getElement(CardElement)
        if(card === null){
            return
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if(error){
            console.log("Payment error", error);
            setError(error.message);
        }
        else{
            console.log("payment method", paymentMethod);
            setError('');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button className="btn btn-sm btn-primary my-4" type="submit" disabled={!stripe || !clientSecret}>
        Pay
      </button>
      <p className="text-red-500">{error}</p>
        </form>
    );
};

export default CheckOutForm;