import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  // TODO: get isAdmin value from database;
  const isAdmin = true;

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
                <NavLink to="/dashboard/addCamps">
                  Add a Camp
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink to="/dashboard/manageCamps">
                  Manage Camps
                </NavLink>
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
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
