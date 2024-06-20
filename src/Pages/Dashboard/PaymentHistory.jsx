import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import useAxiosSecure from "../../Components/Hooks/Secure/useAxiosSecure";

const PaymentHistory = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchPayments = async (page) => {
            try {
                setLoading(true);
                const res = await axiosSecure.get(`/payments/${user.email}`, {
                    params: { page, limit: itemsPerPage }
                });
                setPayments(res.data.payments);
                setTotalPages(res.data.totalPages);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (user && user.email) {
            fetchPayments(currentPage);
        }
    }, [user, axiosSecure, currentPage]);

    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

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

            {/* Pagination controls */}
            <div className="pagination-controls flex justify-center mt-4">
                <button
                    onClick={handlePrevious}
                    className={`px-4 py-2 mx-1 ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"} rounded`}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleClick(index + 1)}
                        className={`px-4 py-2 mx-1 ${index + 1 === currentPage ? "bg-blue-500 text-white" : "bg-gray-300"} rounded`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={handleNext}
                    className={`px-4 py-2 mx-1 ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"} rounded`}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default PaymentHistory;
