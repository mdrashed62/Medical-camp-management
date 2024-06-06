import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import Swal from "sweetalert2";


const CampRegistrationModal = ({ camp }) => {
  const { user } = useContext(AuthContext);


  const handleRegistration = (e) => {
    e.preventDefault();
    const form = e.target;

    const campName = form.campName.value;
    const location = form.location.value;
    const fees = form.fees.value;
    const healthcareProfessional = form.healthcareProfessional.value;
    const age = form.age.value;
    const phoneNumber = form.phoneNumber.value;
    const gender = form.gender.value;
    const emergencyContact = form.emergencyContact.value;
    const participantName = user?.displayName;
    const participantEmail = user?.email;
    
    const addCamp = {
     campName,
     location,
     fees,
     healthcareProfessional,
     age,
     phoneNumber,
     gender,
     emergencyContact,
     participantName,
     participantEmail,
    };

  

    fetch("http://localhost:5000/registeredCamps", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(addCamp),
    })
      .then((res) => res.json())
      .then((data) => {
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
    <dialog id="campRegistrationModal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-3xl mb-4 text-[#071952]">Register for {camp.name}</h3>
       <div className="">
       <form onSubmit={handleRegistration}>
          <input type="hidden"  name="campName" value={camp.name} readOnly />
          <input type="hidden" name="fees" value={camp.fees} readOnly />
          <input type="hidden" name="location" value={camp.location} readOnly />
          <input type="hidden" name="healthcareProfessional" value={camp.healthcareProfessional} readOnly />
         
          <div className="form-control">
          <label>Age</label>
          <input type="text" name="age" placeholder="Enter your age" className="input mb-2 input-bordered input-primary w-full max-w-xs" />
          </div>
          <div className="form-control">
            <label>Phone Number</label>
            <input type="number" name="phoneNumber" placeholder="Enter a phone number" className="input mb-2 input-bordered input-primary w-full max-w-xs" />
          </div>
          <div className="form-control">
            <label>Gender</label>
            <select type="text" name="gender" className="input mb-2 input-bordered input-primary w-full max-w-xs"  required>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
           
          </div>
          <div className="form-control">
            <label>Emergency Contact</label>
            <input name="emergencyContact" placeholder="Emergency Contact" className="input input-bordered mb-2 input-primary w-full max-w-xs" />
          </div>
          <div className="modal-action">
            <button type="submit" className="btn w-40 bg-[#071952] text-white">Register</button>
            <button type="button" className="btn w-20 bg-blue-500 text-white" onClick={() => document.getElementById('campRegistrationModal').close()}>Close</button>
          </div>
        </form>
       </div>
      </div>
    </dialog>
  );
};

export default CampRegistrationModal;
