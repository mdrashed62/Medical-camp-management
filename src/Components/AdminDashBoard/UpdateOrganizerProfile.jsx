import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders";

const UpdateOrganizerProfile = () => {
  const { updateUserData } = useContext(AuthContext);
  const handleUpdate = (e) => {
    console.log(e);
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;

    updateUserData(name, photo).then(() => {});
  };

  return (
    <div>
      <div className="hero-content">
        <div className="card w-full border max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <h1 className="text-3xl text-red-500 font-bold text-center mb-5">
              Update profile
            </h1>
            <form onSubmit={handleUpdate}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">PhotoURL</span>
                </label>
                <input
                  type="url"
                  placeholder="Photo URL"
                  name="photo"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control mt-6">
                <input
                  className="btn p-4 rounded-lg bg-green-500"
                  type="submit"
                  value="Update"
                />
              </div>
              <br />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateOrganizerProfile;
