
import { useContext, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProviders";

const ManageCamps = () => {
  const { user } = useContext(AuthContext);
  // console.log('auth user', user.email); important line
  const listData = useLoaderData();
  const [listSpot, setListSpot] = useState(listData)


  const spots = listData?.filter((spot) => spot.userEmail === user?.email);
  console.log(spots);


  const handleDelete = (id) => {
    console.log(id);
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
        fetch(`http://localhost:5000/touristSpots/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your Spot has been deleted.",
                icon: "success",
              });
              const remaining = listSpot.filter(aSpot => aSpot._id !== id)
              setListSpot(remaining)
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
            <th>Photo</th>
            <th>Spot Name</th>
            <th>Country Name</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {spots?.map((spot, index) => (
            <tr key={index}>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={spot.photo} alt={`Photo of ${spot.name}`} />
                    </div>
                  </div>
                </div>
              </td>
              <td>{spot.spotName}</td>
              <td>{spot.countryName}</td>
              <td>
                <Link to={`/updateSpot/${spot._id}`}>

                <button className="btn btn-ghost btn-xs"  >
                Update
                </button>

                </Link>
                <button
                  className="btn btn-ghost btn-xs"
                  onClick={() => handleDelete(spot._id)}
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
