import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaBan } from "react-icons/fa";

const ManageRegisteredCamps = () => {
  const [registeredCamps, setRegisteredCamps] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10; // Define items per page

  useEffect(() => {
    const fetchRegisteredCamps = async () => {
      try {
        const response = await fetch(`http://localhost:5000/registeredCamps?page=${currentPage}&limit=${itemsPerPage}`);
        const data = await response.json();
        setRegisteredCamps(data.camps);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching registered camps:", error);
      }
    };
    fetchRegisteredCamps();
  }, [currentPage]);

  const handleConfirm = (id) => {
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

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
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

      {/* Pagination controls */}
      <div className="pagination">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageClick(index + 1)}
            className={`px-4 py-2 mx-1 ${index + 1 === currentPage ? "bg-blue-500 text-white" : "bg-gray-300"} rounded`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ManageRegisteredCamps;
