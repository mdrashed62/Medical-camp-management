import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Modal2 = ({ camp }) => {
  const { user } = useContext(AuthContext);
  console.log(camp, "the camp details");
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
    const paymentStatus = "unpaid";
    const confirmationStatus = "Pending";

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
      paymentStatus,
      confirmationStatus,
    };

    fetch(
      "https://medical-camp-management-server-a12.vercel.app/registeredCamps",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(addCamp),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          toast.success("Camp has been registration successfully!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
    form.reset();
  };

  return (
    <dialog id="modal2" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-3xl mb-4 text-[#071952]">
          Register for {camp.campName}
        </h3>
        <div className="">
          <form onSubmit={handleRegistration}>
            <input
              type="hidden"
              name="campName"
              value={camp.campName}
              readOnly
            />
            <input type="hidden" name="fees" value={camp.campFees} readOnly />
            <input
              type="hidden"
              name="location"
              value={camp.location}
              readOnly
            />
            <input
              type="hidden"
              name="healthcareProfessional"
              value={camp.healthcareProfessionalName}
              readOnly
            />

            <div className="form-control">
              <label>Age</label>
              <input
                type="text"
                name="age"
                placeholder="Enter your age"
                className="input mb-2 input-bordered input-primary w-full max-w-xs"
              />
            </div>
            <div className="form-control">
              <label>Phone Number</label>
              <input
                type="number"
                name="phoneNumber"
                placeholder="Enter a phone number"
                className="input mb-2 input-bordered input-primary w-full max-w-xs"
              />
            </div>
            <div className="form-control">
              <label>Gender</label>
              <select
                type="text"
                name="gender"
                className="input mb-2 input-bordered input-primary w-full max-w-xs"
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-control">
              <label>Emergency Contact</label>
              <input
                name="emergencyContact"
                placeholder="Emergency Contact"
                className="input input-bordered mb-2 input-primary w-full max-w-xs"
              />
            </div>
            <div className="modal-action">
              <button
                type="submit"
                className="btn w-40 bg-[#071952] text-white"
              >
                Register
              </button>
              <button
                type="button"
                className="btn w-20 bg-blue-500 text-white"
                onClick={() => document.getElementById("modal2").close()}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </dialog>
  );
};

export default Modal2;
