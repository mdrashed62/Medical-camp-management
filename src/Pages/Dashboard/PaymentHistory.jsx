import useCamps from "../../Components/Hooks/useCamps";


const PaymentHistory = () => {
    const [camps] = useCamps()
     console.log(camps)
    return (
        <div>
            <h2>Payment History</h2>
        </div>
    );
};

export default PaymentHistory;