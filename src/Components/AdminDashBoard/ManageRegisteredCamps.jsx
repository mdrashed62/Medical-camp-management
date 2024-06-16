import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaBan } from "react-icons/fa";

const ManageRegisteredCamps = () => {
  const [registeredCamps, setRegisteredCamps] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/registeredCamps")
      .then((res) => res.json())
      .then((data) => setRegisteredCamps(data));
  }, []);

  const handleConfirm = (id) => {
    // Confirm the registration
    fetch(`http://localhost:5000/confirmRegistration/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          setRegisteredCamps((prevCamps) =>
            prevCamps.map((camp) =>
              camp._id === id ? { ...camp, confirmationStatus: "Confirmed" } : camp
            )
          );
          Swal.fire("Success", "Registration Confirmed!", "success");
        }
      });
  };

  const handleCancel = (id) => {
    // Cancel the registration
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/cancelRegistration/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              setRegisteredCamps((prevCamps) =>
                prevCamps.filter((camp) => camp._id !== id)
              );
              Swal.fire("Cancelled!", "Your registration has been cancelled.", "success");
            }
          });
      }
    });
  };

  return (
    <div className="">
      <table className="table">
        <thead>
          <tr>
            <th>Camp Name</th>
            <th>Fees</th>
            <th>Participant Name</th>
            <th>Payment Status</th>
            <th>Confirmation Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {registeredCamps.map((camp) => (
            <tr key={camp._id}>
              <td>{camp.campName}</td>
              <td>{camp.fees}</td>
              <td>{camp.participantName}</td>
              <td>{camp.paymentStatus}</td>
              <td>
                {camp.confirmationStatus === "Pending" ? (
                  <button onClick={() => handleConfirm(camp._id)}>Pending</button>
                ) : (
                  "Confirmed"
                )}
              </td>
              <td>
              <button
                  onClick={() => handleCancel(camp._id)}
                  disabled={camp.paymentStatus === "Paid" && camp.confirmationStatus === "Confirmed"}
                >
                  {camp.paymentStatus === "Paid" && camp.confirmationStatus === "Confirmed" ? (
                    <FaBan />
                  ) : (
                    "Cancel"
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageRegisteredCamps;
