import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../Providers/AuthProviders";
import SocialLogin from "../Components/SocialLogin";
import { useForm } from "react-hook-form";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const { createUser, updateUserData, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const from = "/";

  const onSubmit = (data) => {
    const { name, email, photo, password } = data;
    const role = "user";

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log("Here the user", user);
        updateUserData(name, photo).then(() => {
          const newUser = { name, email, photo, role };
          fetch("https://medical-camp-management-server-a12.vercel.app/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              setUser((prevUser) => ({
                ...prevUser,
                displayName: name,
                photoURL: photo,
              }));
              navigate(from);
            })
            .catch((error) => {
              console.error("Error during user data update:", error);
            });
        });
      })
      .catch((error) => {
        console.error("Error during registration:", error);
      });
  };

  return (
    <div className="card shrink-0 w-full mb-6 max-w-sm border mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            {...register("name", { required: true })}
            name="name"
            placeholder="Name"
            className="input input-bordered"
            required
          />
          {errors.name && (
            <span className="text-red-500">Name is required</span>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            {...register("email", { required: true })}
            name="email"
            placeholder="Email"
            className="input input-bordered"
            required
          />
          {errors.email && (
            <span className="text-red-500">Email is required</span>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo Url</span>
          </label>
          <input
            type="text"
            {...register("photo")}
            name="photo"
            placeholder="Photo URL"
            className="input input-bordered"
            required
          />
        </div>
        <div className="relative">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true })}
              name="password"
              placeholder="Password"
              className="input input-bordered"
              required
            />
            <span
              className="absolute top-[53px] right-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        <div className="form-control mt-6">
          <button type="submit" className=" w-full bg-[#5B74FF] py-2 rounded hover:bg-black text-white">
            Register
          </button>
          <p className="text-center mt-1">
            Already have an account? Please{" "}
            <span className="text-green-500 font-bold">
              <Link to="/login">Login</Link>
            </span>
          </p>
        </div>
      </form>
      <SocialLogin />
    </div>
  );
};

export default Register;
