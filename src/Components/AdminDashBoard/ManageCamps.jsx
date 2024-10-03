import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProviders";

const ManageCamps = () => {
  const { user } = useContext(AuthContext);
  const [campData, setCampData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // State to track current page
  const [campsPerPage] = useState(10); // Number of camps per page
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  useEffect(() => {
    const fetchCamps = async () => {
      try {
        const response = await fetch(
          `https://medical-camp-management-server-a12.vercel.app/addedCamps`
        );
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

  const indexOfLastCamp = currentPage * campsPerPage;
  const indexOfFirstCamp = indexOfLastCamp - campsPerPage;
  const currentCamps = campData.slice(indexOfFirstCamp, indexOfLastCamp);
  console.log(currentCamps);

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
        fetch(
          `https://medical-camp-management-server-a12.vercel.app/addedCamps/${id}`,
          {
            method: "DELETE",
          }
        )
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

  const handleSearch = (e) => {
    e.preventDefault();
    const term = e.target.search.value.toLowerCase();
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const filteredCamps = campData.filter(
    (camp) =>
      camp.campName.toLowerCase().includes(searchTerm) ||
      camp.location.toLowerCase().includes(searchTerm) ||
      camp.dateTime.toLowerCase().includes(searchTerm)
  );

  return (
    <div>
        <form onSubmit={handleSearch} className="flex">
        <input
          type="text"
          placeholder="Search for camp"
          name="search"
          className=" rounded pl-4 w-2/3 bg-[#EAF0FF]"
        />
        <button
          type="submit"
          className="py-[6px] text-white font-semibold rounded ml-4 w-1/3 bg-[#5B74FF]"
        >
          Search
        </button>
      </form>

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
          {filteredCamps.length > 0 ? (
            filteredCamps
              .slice(indexOfFirstCamp, indexOfLastCamp)
              .map((camp) => (
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
      {filteredCamps.length > campsPerPage && (
        <div className="flex justify-center mt-4">
          {Array.from({
            length: Math.ceil(filteredCamps.length / campsPerPage),
          }).map((item, index) => (
            <button
              key={index}
              onClick={() => handlePageClick(index + 1)}
              className={`px-4 py-2 mx-1 ${
                index + 1 === currentPage
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300"
              } rounded`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageCamps;
