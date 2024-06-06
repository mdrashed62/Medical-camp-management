import { useContext, useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProviders";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  // console.log("user", user)
  const [loading, setLoading] = useState()
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => {
        const currentUser = data.find(u => u.email === user?.email);
        // console.log('users', currentUser);
        setIsAdmin(currentUser?.role === 'admin');
       setLoading(false)
      })
      .catch((error) => console.error("Error fetching users:", error));
      setLoading(false)
  }, [user]);
  // console.log("is admin", isAdmin)
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex mt-4">
      <div className="w-64 min-h-screen rounded-md bg-orange-400">
        <ul className="menu">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/organizerProfile">
                  Organizer Profile
                </NavLink>
              </li>
              <li className="mt-2 mb-2">
                <NavLink to="/dashboard/addCamps">Add a Camp</NavLink>
              </li>
              <li className="mb-2">
                <NavLink to="/dashboard/manageCamps">Manage Camps</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageRegisteredCamps">
                  Manage Registered Camps
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/analytics">Analytics</NavLink>
              </li>
              <li className="mt-2 mb-2">
                <NavLink to="/dashboard/participantProfile">
                  Participant Info
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink to="/dashboard/registeredCamps">
                  Registered Camps
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/paymentHistory">
                  Payment History
                </NavLink>
              </li>
            </>
          )}
          <div className="divider"></div>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
        </ul>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
