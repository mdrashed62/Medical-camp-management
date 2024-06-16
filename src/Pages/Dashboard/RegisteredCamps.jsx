import { useContext, useState, useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProviders";

const RegisteredCamps = () => {
  const { user } = useContext(AuthContext);
  const registeredCampsData = useLoaderData();
  const [campData, setCampData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (registeredCampsData) {
      setCampData(
        registeredCampsData?.filter(
          (camp) => camp.participantEmail === user?.email
        )
      );
    }
  }, [registeredCampsData, user]);

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
                text: "Your camp has been deleted.",
                icon: "success",
              });
              setCampData((prevCampData) =>
                prevCampData.filter((camp) => camp._id !== id)
              );
            }
          });
      }
    });
  };

  // const handlePaymentSuccess = (campId) => {
  //   setCampData((prevCampData) =>
  //     prevCampData.map((camp) =>
  //       camp._id === campId ? { ...camp, paymentStatus: "Paid" } : camp
  //     )
  //   );
  // };

  const handleSearch = (e) => {
    e.preventDefault();
    const term = e.target.search.value.toLowerCase();
    setSearchTerm(term);
  };

  const filteredCamps = campData.filter(
    (camp) =>
      camp.campName.toLowerCase().includes(searchTerm) ||
      camp.healthcareProfessional.toLowerCase().includes(searchTerm)
  );

  return (
    <div>
      <form onSubmit={handleSearch} className="flex">
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
          {filteredCamps.length > 0 ? (
            filteredCamps.map((camp) => (
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
                      <button
                        className="btn btn-sm"
                        // onClick={() => handlePayment(camp)}
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
                  <button className="btn ml-2 text-white bg-red-500 btn-ghost btn-xs">
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
    </div>
  );
};

export default RegisteredCamps;
