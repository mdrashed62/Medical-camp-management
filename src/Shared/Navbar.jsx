import { useContext, useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProviders";
import mediLogo from "../assets/mediLogo.avif";
import { FaArrowRight } from "react-icons/fa";

const Navbar = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);

    localStorage.setItem("theme", newTheme);
  };

  const handleSignOut = () => {
    logOut()
      .then(() => navigate("/"))
      .catch();
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      <li className="ml-4 mr-4">
        <NavLink to="/availableCamps">Available Camps</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 mb-6">
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-50 menu menu-sm mt-3 p-4 shadow bg-base-100 space-y-3 rounded w-52"
          >
            {navLinks}
          </ul>
        </div>

        <div className="flex items-center text-[10px] md:text-2xl lg:text-3xl rounded font-semibold">
          <div className="w-12 h-12">
            <img className="rounded" src={mediLogo} alt="Logo" />
          </div>
          <p className="text-blue-500 lg: ml-2 font-bold">Medi Camp 360</p>
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>

      <div className="navbar-end flex items-center">
        <label
          onClick={handleTheme}
          className="flex cursor-pointer mr-8 gap-2 "
        >
          <input type="checkbox" className="toggle theme-controller" />
        </label>
        {user ? (
          <div className="dropdown z-50 dropdown-bottom dropdown-hover  dropdown-end">
            <div className="flex gap-2 items-center">
              <p className="text-xl text-[#3B82F6]"><FaArrowRight/></p>
              <div
                tabIndex={0}
                role="button"
                className="flex items-center cursor-pointer"
              >
                <img
                  src={user?.photoURL}
                  className="w-12 h-12 rounded-full"
                  alt="User Profile"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content bg-[#EAF0FF] z-[1] menu shadow  rounded p-4 w-52"
            >
              <li className="py-2 font-semibold">{user?.displayName}</li>
              <li className="bg-blue-400 rounded text-white hover:bg-black">
                <Link to="/dashboard/analytics">Dashboard</Link>
              </li>
              <li className="mt-4">
                <button
                  onClick={handleSignOut}
                  className="py-[6px] rounded bg-gradient-to-r from-sky-500 to-indigo-500 text-white"
                >
                  Logout
                </button>
              </li>
              <li></li>
            </ul>
          </div>
        ) : (
          <Link
            to="/login"
            className=" px-4 lg:px-8 py-2 rounded-full hover:bg-gradient-to-r hover:from-cyan-600 hover:to-blue-600 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold"
          >
            Join US
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
