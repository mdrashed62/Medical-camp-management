import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../Components/Hooks/Secure/useAxiosSecure";
import { AuthContext } from "../../../Providers/AuthProviders";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const CheckOutFormPayment = ({ fees, campId, campName}) => {
    const {user} = useContext(AuthContext);
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const axiosSecure = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
       if(fees > 0){
        axiosSecure.post('/create-payment-intent', {price: fees})
        .then(res => {
            console.log(res.data.clientSecret)
            setClientSecret(res.data.clientSecret)
        })
       }
    }, [axiosSecure, fees])

    

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
            type: 'card',
            card
        });

        if (error) {
            console.log("Payment error", error);
            setError(error.message);
        } else {
            console.log("Payment method", paymentMethod);
            setError('');
        }
        const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card, 
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if(confirmError) {
            console.log('confirm error')
        }
        else{
            console.log(paymentIntent, 'payment intent')
            if(paymentIntent.status === 'succeeded'){
                console.log('transaction id', paymentIntent.id)
                setTransactionId(paymentIntent.id);

                //now save the payment in the database
                const payment = {
                    email: user.email,
                    price: fees,
                    status: 'pending',
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    id: campId,
                    campName: campName,
                    paymentStatus: 'Paid',
                    confirmationStatus: 'Confirmed'
                }
               const res = await axiosSecure.post('/payments', payment);
               if(res.data){
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Payment Successful",
                    showConfirmButton: false,
                    timer: 2000,
                  });
                  navigate('/dashboard/paymentHistory')
               }
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
                    className="btn btn-sm btn-primary my-4"
                    type="submit"
                    disabled={!stripe|| !clientSecret}
                >
                    Pay ${fees}
                </button>
                <p className="text-red-500">{error}</p>
                {transactionId && <p className="text-green-600">Your transaction id: {transactionId}</p>}
            </form>
        </div>
    );
};

export default CheckOutFormPayment;
