import { useContext, useState, useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProviders";

const RegisteredCamps = () => {
  const { user } = useContext(AuthContext);
  const registeredData = useLoaderData();
  console.log(registeredData)
  const [campData, setCampData] = useState([]);

  useEffect(() => {
    if (registeredData) {
      setCampData(registeredData.filter((camp) => camp.participantEmail === user?.email));
    }
  }, [registeredData, user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/registeredCamps/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your Camp has been deleted.",
                icon: "success",
              });
              setCampData((prevCampData) => prevCampData.filter((camp) => camp._id !== id));
            }
          });
      }
    });
  };

  const handlePayment = () => {

  }

  return (
    <div> 
      <table className="table">
        <thead>
          <tr>
            <th className="font-bold">Camp Name</th>
            <th className="font-bold">Camp Fees</th>
            <th className="font-bold">Participant Name</th>
            <th className="font-bold">Payment Status</th>
            <th className="font-bold">Confirmation Status</th>
            <th className="font-bold">Cancel</th>
            <th className="font-bold">Feedback</th>
            
          </tr>
        </thead>
        <tbody>
            {campData?.map((camp) => (
              <tr key={camp._id}>
                <td>{camp.campName}</td>
                <td>{camp.fees} $</td>
                <td>{camp.participantName}</td>
                <td>
                  {camp.paymentStatus === "Paid" ? (
                    <button className="btn btn-sm" disabled>Paid</button>
                  ) : (
                    <Link to={`/dashboard/payment/${camp._id}`}>
                    <button
                      className="btn btn-sm"
                      onClick={() => handlePayment(camp)}
                      // disabled={paymentProcessing}
                    >
                      Pay
                    </button>
                    </Link>
                  )}
                </td>
                <td>{camp.confirmationStatus}</td>
                <td>
                  <button
                    className="btn ml-2 text-white bg-red-500 btn-ghost btn-xs"
                    onClick={() => handleDelete(camp._id)}
                  >
                    Cancel
                  </button>
                </td>
                <td>
                  <button
                    className="btn ml-2 text-white bg-red-500 btn-ghost btn-xs"
                  >
                    Feedback
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
      </table>
    </div>
  );
};

export default RegisteredCamps;

