import { useContext, useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProviders";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetch("https://medical-camp-management-server-a12.vercel.app/users")
      .then((res) => res.json())
      .then((data) => {
        const currentUser = data?.find((u) => u.email === user?.email);
        setIsAdmin(currentUser?.role === "admin");
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row mt-4">
      <div className="w-full lg:w-64 min-h-screen rounded-md bg-orange-400">
        <ul className="menu p-4">
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
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
