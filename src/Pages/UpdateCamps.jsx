import { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Providers/AuthProviders";
import { useLoaderData } from "react-router-dom";

const UpdateCamps = () => {
  const addedCampForUpdate = useLoaderData();
  console.log("Loaded camp data:", addedCampForUpdate);

  const { user } = useContext(AuthContext);

  const {
    _id,
    campName,
    location,
    image,
    campFees,
    dateTime,
    healthcareProfessionalName,
    description,
    participantCount,
  } = addedCampForUpdate;

  console.log("variable of addedCampForUpdate", addedCampForUpdate);

  const handleUpdateCamps = (e) => {
    e.preventDefault();
    const form = e.target;

    const campName = form.campName.value;
    const location = form.location.value;
    const image = form.image.value;
    const campFees = form.fees.value;
    const dateTime = form.dateTime.value;
    const healthcareProfessionalName = form.healthcareProfessional.value;
    const description = form.description.value;
    const participantCount = form.participantCount.value;
    const organizerName = user?.displayName;
    const organizerEmail = user?.email;

    const updateCamp = {
      campName,
      image,
      location,
      description,
      dateTime,
      campFees,
      healthcareProfessionalName,
      participantCount,
      organizerName,
      organizerEmail,
    };

    console.log(updateCamp);

    fetch(
      `https://medical-camp-management-server-a12.vercel.app/addedCamps/${_id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updateCamp),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data) {
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Camp Updated Successfully",
            showConfirmButton: true,
          });
        }
      });
    form.reset();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const formattedDate = dateTime ? formatDate(dateTime) : "";

  return (
    <div className=" mb-4  bg-gray-300 p-20 rounded">
      <h3 className="text-4xl text-[#071952] font-bold text-center mb-6">
        Update the Camp
      </h3>
      <form onSubmit={handleUpdateCamps}>
        {/* from name and quantity row */}
        <div className="md:flex gap-4 mb-4">
          <div className="md:w-1/2">
            <span className="label-text">Camp Name</span>

            <input
              type="text"
              placeholder="Camp Name"
              className="input input-bordered w-full"
              name="campName"
              defaultValue={campName}
              id=""
            />
          </div>
          <div className="md:w-1/2">
            <span className="label-text">Fees</span>
            <input
              type="number"
              placeholder="Camp fees"
              className="input input-bordered w-full"
              name="fees"
              defaultValue={campFees}
              id=""
            />
          </div>
        </div>
        {/* from supplier row */}
        <div className="md:flex gap-4 mb-4">
          <div className="md:w-1/2">
            <span className="label-text">Participant Count</span>

            <input
              type="number"
              placeholder="Count of Participant"
              className="input input-bordered w-full"
              name="participantCount"
              defaultValue={participantCount}
              id=""
            />
          </div>
          <div className=" md:w-1/2">
            <span className="label-text">Camp Location</span>

            <input
              placeholder="Camp location"
              className="input input-bordered w-full"
              name="location"
              defaultValue={location}
              id=""
            />
          </div>
        </div>
        <div className="md:flex gap-4 mb-4">
          <div className="md:w-1/2">
            <span className="label-text">Date and Time</span>

            <input
              type="date"
              defaultValue={formattedDate}
              className="input input-bordered w-full"
              name="dateTime"
              id=""
            />
            {console.log("fwearoijwoerho", dateTime)}
          </div>
          <div className=" md:w-1/2">
            <span className="label-text">Healthcare Professional Name</span>
            <input
              type="text"
              placeholder="Professional name"
              className="input input-bordered w-full"
              name="healthcareProfessional"
              defaultValue={healthcareProfessionalName}
              id=""
            />
          </div>
        </div>
        {/* from category and details row */}

        {/* from photo url row */}

        <div className=" mb-4">
          <div className=" w-full">
            <span className="label-text">Camp Image</span>

            <input
              placeholder="Photo Url"
              className="input input-bordered w-full"
              name="image"
              defaultValue={image}
              id=""
            />
          </div>
        </div>
        <div className=" mb-4">
          <div className=" w-full">
            <span className="label-text">Description</span>

            <input
              type="text"
              placeholder="Description"
              className="input input-bordered w-full"
              name="description"
              defaultValue={description}
              id=""
            />
          </div>
        </div>

        <input
          type="submit"
          value="Click for Update"
          className="btn btn-block text-white bg-[#071952]"
        />
      </form>
    </div>
  );
};

export default UpdateCamps;
