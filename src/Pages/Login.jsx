
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../Providers/AuthProviders";
import SocialLogin from "../Components/SocialLogin";
import { useForm } from "react-hook-form";


const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signIn, googleLogin} = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState();

  const onSubmit = data => {
    const { email, password } = data;

    signIn(email, password)
      .then(result => {
        console.log(result.user);
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 2000
        });
        navigate(location?.state?.from || '/');
      })
      .catch((error) => {
        console.error("Login failed:", error);
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
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              name="email"
              placeholder="email"
              className="input input-bordered"
              required
            />
            {errors.name && <span className="text-red-500">Email is required</span>}
          </div>
          <div className="relative">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input {...register("password")} type={showPassword? 'text':'password'} placeholder="password" name='password' className="input input-bordered" required />
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