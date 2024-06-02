import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";

const CampRegistrationModal = ({ camp }) => {
  const { user } = useContext(AuthContext);

  const handleRegistration = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const registrationData = Object.fromEntries(formData.entries());
    
    // Save registrationData to your database and update participant count
    console.log(registrationData);
  };

  return (
    <dialog id="campRegistrationModal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Register for {camp.name}</h3>
        <form onSubmit={handleRegistration}>
          <input type="hidden" name="campName" value={camp.name} readOnly />
          <input type="hidden" name="fees" value={camp.fees} readOnly />
          <input type="hidden" name="location" value={camp.location} readOnly />
          <input type="hidden" name="healthcareProfessional" value={camp.healthcareProfessional} readOnly />
          <input type="hidden" name="participantName" value={user?.displayName || ''} readOnly />
          <input type="hidden" name="participantEmail" value={user?.email || ''} readOnly />
          
          <div className="form-control">
            <label>Age</label>
            <input type="number" name="age" required />
          </div>
          <div className="form-control">
            <label>Phone Number</label>
            <input type="text" name="phoneNumber" required />
          </div>
          <div className="form-control">
            <label>Gender</label>
            <select name="gender" required>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-control">
            <label>Emergency Contact</label>
            <input type="text" name="emergencyContact" required />
          </div>
          <div className="modal-action">
            <button type="submit" className="btn">Register</button>
            <button type="button" className="btn" onClick={() => document.getElementById('campRegistrationModal').close()}>Close</button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default CampRegistrationModal;
