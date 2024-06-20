import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProviders";

const ManageCamps = () => {
  const { user } = useContext(AuthContext);
  const [campData, setCampData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // State to track current page
  const [campsPerPage] = useState(10); // Number of camps per page

  useEffect(() => {
    const fetchCamps = async () => {
      try {
        const response = await fetch(`http://localhost:5000/addedCamps`);
        if (!response.ok) {
          throw new Error("Failed to fetch camps");
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          const filteredData = data.filter(
            (camp) => camp.organizerEmail === user?.email
          );
          setCampData(filteredData);
        } else if (data.camps && Array.isArray(data.camps)) {
          const filteredData = data.camps.filter(
            (camp) => camp.organizerEmail === user?.email
          );
          setCampData(filteredData);
        } else {
          console.error("Invalid data structure:", data);
        }
      } catch (error) {
        console.error("Error fetching camps:", error);
      }
    };
    fetchCamps();
  }, [user]);

  // Logic to calculate current camps to display based on pagination
  const indexOfLastCamp = currentPage * campsPerPage;
  const indexOfFirstCamp = indexOfLastCamp - campsPerPage;
  const currentCamps = campData.slice(indexOfFirstCamp, indexOfLastCamp);

  const handlePageClick = (pageNumber) => setCurrentPage(pageNumber);

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
        fetch(`http://localhost:5000/addedCamps/${id}`, {
          method: "DELETE",
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error("Failed to delete camp");
            }
            return res.json();
          })
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your Camp has been deleted.",
                icon: "success",
              });
              setCampData((prevCampData) =>
                prevCampData.filter((camp) => camp._id !== id)
              );
            } else {
              Swal.fire("Error", "Failed to delete camp", "error");
            }
          })
          .catch((error) => {
            console.error("Error deleting camp:", error);
            Swal.fire("Error", "Failed to delete camp", "error");
          });
      }
    });
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th className="text-xl font-bold">Camp Name</th>
            <th className="text-xl font-bold">Location</th>
            <th className="text-xl font-bold">Date And Time</th>
            <th className="text-xl font-bold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentCamps.length > 0 ? (
            currentCamps.map((camp) => (
              <tr key={camp._id}>
                <td>{camp.campName}</td>
                <td>{camp.location}</td>
                <td>{camp.dateTime}</td>
                <td>
                  <Link to={`/dashboard/updateCamps/${camp._id}`}>
                    <button className="btn bg-[#071952] text-white btn-ghost btn-xs">
                      Update
                    </button>
                  </Link>
                  <button
                    className="btn ml-2 text-white bg-red-500 btn-ghost btn-xs"
                    onClick={() => handleDelete(camp._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No camps found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {campData.length > campsPerPage && (
        <div className="flex justify-center mt-4">
          {Array.from({ length: Math.ceil(campData.length / campsPerPage) }).map(
            (item, index) => (
              <button
                key={index}
                onClick={() => handlePageClick(index + 1)}
                className={`px-4 py-2 mx-1 ${
                  index + 1 === currentPage ? "bg-blue-500 text-white" : "bg-gray-300"
                } rounded`}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default ManageCamps;
