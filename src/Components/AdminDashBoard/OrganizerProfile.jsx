import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProviders";

const OrganizerProfile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex justify-center mt-8">
      <div className="bg-white border rounded-2xl  lg:w-3/5 mb-6 ">
        <img
          alt="profile"
          src="https://i.postimg.cc/JnDqSG36/360-F-438556946-UKup-Zv-Zr-Czbf-Ixawj8-P57ho-DSl7ypza9.jpg "
          className="w-full mb-4 rounded-t-lg h-36 md:h-52 "
        />
        <div className="flex flex-col lg:flex-reverse items-center justify-center p-4 -mt-16">
          <a href="#" className="relative block">
            <img
              alt="profile"
              src={user?.photoURL}
              className="mx-auto object-cover rounded-full h-24 w-24  border-2 border-white "
            />
          </a>

          <div className="w-full p-2 mt-4 rounded">
            <div className="flex flex-wrap items-center justify-between text-sm text-gray-600 ">
              <div>
                <p className="flex flex-col mt-3">
                  Name
                  <span className="font-bold text-black ">
                    {user?.displayName}
                  </span>
                </p>
                <p className="flex flex-col mt-3 mb-3">
                  Email
                  <span className="font-bold text-black ">{user?.email}</span>
                </p>
              </div>

              <div>
                <Link to="/dashboard/updateParticipantProfile">
                  <button className="py-[6px] px-6 hover:bg-black hover:text-white bg-red-500 rounded  text-white  mt-3 mb-3">
                    Update
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerProfile;
