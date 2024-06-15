import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import useAxiosSecure from "../../Components/Hooks/Secure/useAxiosSecure";

const PaymentHistory = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                setLoading(true);
                const res = await axiosSecure.get(`/payments/${user.email}`);
                setPayments(res.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (user && user.email) {
            fetchPayments();
        }
    }, [user, axiosSecure]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2 className="text-center font-bold text-3xl text-lime-600 mb-6">Your Payment History</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th className="font-bold text-xl">Camp Name</th>
                        <th className="font-bold text-xl">Camp Fees</th>
                        <th className="font-bold text-xl">Payment status</th>
                        <th className="font-bold text-xl">Confirmation Status</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.length > 0 ? (
                        payments.map(camp => (
                            <tr key={camp._id}>
                                <td>{camp.campName}</td>
                                <td>{camp.price} $</td>
                                <td>{camp.paymentStatus}</td>
                                <td>{camp.confirmationStatus}</td>
                                
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">No camps found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentHistory;
