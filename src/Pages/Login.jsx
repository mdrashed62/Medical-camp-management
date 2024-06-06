
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../Providers/AuthProviders";
import SocialLogin from "../Components/SocialLogin";


const Login = () => {
  const { signIn, googleLogin} = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");
    signIn(email, password)
   

    .then(result => {
      console.log(result.user)
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 2000
      });
      navigate(location?.state? location.state: '/')
    })
    .catch((error) => {
      console.log(error)
      Swal.fire({
          position: "top",
          icon: "error",
          title: "Login Failed",
          text: "Incorrect email or password. Please try again.",
          showConfirmButton: true,
      });
  });
  };

  return (
    <div >
      <div className="card shrink-0 w-full mb-4 max-w-sm shadow-xl bg-gray-300 border  mx-auto">
        <form onSubmit={handleLogin} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="relative">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type={showPassword? 'text':'password'} placeholder="password" name='password' className="input input-bordered" required />
         <span className="absolute top-[53px] right-3" onClick={() =>setShowPassword(!showPassword)}>
         {
            showPassword? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
          }
         </span>
        
        </div>
       </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn text-white  rounded-lg bg-green-500">
              Login
            </button>
          </div>
          <p className="text-center">
            New here? please{" "}
            <span className="text-red-500 font-bold">
              <Link to="/register">Register</Link>
            </span>
          </p>
          <h2 className="font-bold text-xl text-green-500 text-center ">Continue With</h2>
        </form>
       <SocialLogin googleLogin={googleLogin}></SocialLogin>
      </div>
    </div>
  );
};

export default Login;