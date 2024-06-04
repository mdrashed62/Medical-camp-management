import { useContext } from "react";
// import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProviders";
import Swal from "sweetalert2";


const AddCamps = () => {
    const { user } = useContext(AuthContext);
    
  
    const handleAddCamps = (e) => {
      e.preventDefault();
      const form = e.target;
  
    const campName = form.campName.value;
    const location = form.location.value;
    const image = form.image.value;
    const fees = form.fees.value;
    const dateTime = form.dateTime.value;
    const healthcareProfessional = form.healthcareProfessional.value;
    const description = form.description.value;
    const participantCount = form.participantCount.value;
    const organizerName = user?.displayName;
    const organizerEmail = user?.email;
  
    
    const addCamp = {
     campName,
     image,
     location,
     description,
     dateTime,
     fees,
     healthcareProfessional,
     participantCount,
     organizerName,
     organizerEmail
    };

  
      console.log(addCamp);
  
      //send data to the server
  
      fetch("http://localhost:5000", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(addCamp),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          if (data) {
            Swal.fire({
              position: "top",
              icon: "success",
              title: "Service has been added",
              showConfirmButton: false,
              timer: 2000,
            });
          }
        });
      form.reset();
    };
  
    return (
      <div className=" mb-4  bg-gray-300 p-20 rounded-lg">
        <h3 className="text-4xl text-purple-500 font-bold text-center mb-6">Add Camp</h3>
        <form onSubmit={handleAddCamps}>
          {/* from name and quantity row */}
          <div className="md:flex gap-4 mb-4">
            <div className="md:w-1/2">
              <span className="label-text">Camp Name</span>
  
              <input
                type="text"
                placeholder="Camp Name"
                className="input input-bordered w-full"
                name="campName"
                // defaultValue={spotName}
                id=""
              />
            </div>
            <div className="md:w-1/2">
              <span className="label-text">Fees</span>
              <input
               
                placeholder="Camp fees"
                className="input input-bordered w-full"
                name="fees"
                // defaultValue={}
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
                // defaultValue={}
                id=""
              />
            </div>
            <div className=" md:w-1/2">
              <span className="label-text">Camp Location</span>
  
              <input
                placeholder="Camp location"
                className="input input-bordered w-full"
                name="location"
                // defaultValue={}
                id=""
              />
            </div>
          </div>
          <div className="md:flex gap-4 mb-4">
            <div className="md:w-1/2">
              <span className="label-text">Date and Time</span>
  
              <input
                type="date"
                className="input input-bordered w-full"
                name="dateTime"
                // defaultValue={}
                id=""
              />
            </div>
            <div className=" md:w-1/2">
              <span className="label-text">Healthcare Professional Name</span>
              <input
                type="text"
                placeholder="Professional name"
                className="input input-bordered w-full"
                name="healthcareProfessional"
                // defaultValue={}
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
                // defaultValue={}
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
                // defaultValue={}
                id=""
              />
            </div>
          </div>
  
          <input
            type="submit"
            value="Add Camps"
            className="btn btn-block text-white bg-green-500"
          />
        </form>
      </div>
    );
  };
  
  export default AddCamps;
  