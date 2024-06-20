import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProviders";

const RegisteredCamps = () => {
  const { user } = useContext(AuthContext);
  const [campData, setCampData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch(
      "https://medical-camp-management-server-a12.vercel.app/registeredCamps"
    )
      .then((res) => res.json())
      .then((data) => {
        if (data && data.camps && Array.isArray(data.camps)) {
          // Filter data based on logged-in user's email
          const filteredData = data.camps.filter(
            (camp) => camp.participantEmail === user?.email
          );
          setCampData(filteredData);
        } else {
          console.error("Unexpected data format:", data);
        }
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, [user]);

  const handleDelete = (id, paymentStatus, confirmationStatus) => {
    if (paymentStatus === "Paid" && confirmationStatus === "Confirmed") {
      Swal.fire({
        title: "Cannot Cancel",
        text: "Registration is already confirmed and paid.",
        icon: "error",
      });
    } else {
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
          fetch(
            `https://medical-camp-management-server-a12.vercel.app/registeredCamps/${id}`,
            {
              method: "DELETE",
            }
          )
            .then((res) => res.json())
            .then((data) => {
              if (data.deletedCount > 0) {
                Swal.fire({
                  title: "Deleted!",
                  text: "Your camp has been deleted.",
                  icon: "success",
                });
                setCampData((prevCampData) =>
                  prevCampData.filter((camp) => camp._id !== id)
                );
              }
            })
            .catch((err) => console.error("Error deleting camp:", err));
        }
      });
    }
  };

  const handleFeedback = (id, name, campsName) => {
    Swal.fire({
      title: "Feedback",
      input: "textarea",
      inputPlaceholder: "Write your feedback here...",
      showCancelButton: true,
      confirmButtonText: "Submit",
      showLoaderOnConfirm: true,
      preConfirm: (feedback) => {
        return fetch(
          "https://medical-camp-management-server-a12.vercel.app/feedback",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              campId: id,
              feedback: feedback,
              participantName: name,
              campName: campsName,
            }),
          }
        )
          .then((res) => {
            if (!res.ok) {
              throw new Error(res.statusText);
            }
            return res.json();
          })
          .then((data) => {
            Swal.fire("Feedback submitted!", "", "success");
            console.log(data);
          })
          .catch((error) => {
            Swal.fire("Error submitting feedback:", error.message, "error");
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const term = e.target.search.value.toLowerCase();
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const filteredCamps = campData.filter(
    (camp) =>
      camp.campName.toLowerCase().includes(searchTerm) ||
      camp.healthcareProfessional.toLowerCase().includes(searchTerm)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCamps = filteredCamps.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCamps.length / itemsPerPage);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="flex mb-4">
        <input
          type="text"
          placeholder="Search for camp"
          name="search"
          className="py-2 rounded-lg pl-4 w-2/3 bg-slate-300"
        />
        <button
          type="submit"
          className="btn text-white font-semibold text-xl py-2 rounded-lg ml-4 w-1/3 bg-green-500"
        >
          Search
        </button>
      </form>
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
          {currentCamps.length > 0 ? (
            currentCamps.map((camp) => (
              <tr key={camp._id}>
                <td>{camp.campName}</td>
                <td>{camp.fees} $</td>
                <td>{camp.participantName}</td>
                <td>
                  {camp.paymentStatus === "Paid" ? (
                    <button className="btn btn-sm" disabled>
                      Paid
                    </button>
                  ) : (
                    <Link to={`/dashboard/payment/${camp._id}`}>
                      <button className="btn btn-sm">Pay</button>
                    </Link>
                  )}
                </td>
                <td>{camp.confirmationStatus}</td>
                <td>
                  <button
                    className={`btn ml-2 text-white bg-red-500 btn-ghost btn-xs ${
                      camp.paymentStatus === "Paid" &&
                      camp.confirmationStatus === "Confirmed"
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    onClick={() =>
                      handleDelete(
                        camp._id,
                        camp.paymentStatus,
                        camp.confirmationStatus
                      )
                    }
                    disabled={
                      camp.paymentStatus === "Paid" &&
                      camp.confirmationStatus === "Confirmed"
                    }
                  >
                    Cancel
                  </button>
                </td>
                <td>
                  <button
                    className="btn ml-2 text-white bg-red-500 btn-ghost btn-xs"
                    onClick={() =>
                      handleFeedback(
                        camp._id,
                        camp.participantName,
                        camp.campName
                      )
                    }
                  >
                    Feedback
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No camps found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination controls */}
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => handleClick(index + 1)}
          className={`px-4 py-2 mx-1 ${
            index + 1 === currentPage ? "bg-blue-500 text-white" : "bg-gray-300"
          } rounded`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default RegisteredCamps;
