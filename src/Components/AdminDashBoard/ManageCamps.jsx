import { useContext, useState, useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProviders";

const ManageCamps = () => {
  const { user } = useContext(AuthContext);
  const campsData = useLoaderData();
  const [campData, setCampData] = useState([]);
  
  useEffect(() => {
    if (campsData) {
      setCampData(campsData.filter((camp) => camp.organizerEmail === user?.email));
    }
  }, [campsData, user]);

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
          {campData?.map((camp) => (
           
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCamps;
