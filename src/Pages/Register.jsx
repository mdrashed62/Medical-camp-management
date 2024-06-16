import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../Providers/AuthProviders";
import SocialLogin from "../Components/SocialLogin";
import { useForm } from "react-hook-form";

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const { createUser, updateUserData, setLoading, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const from = '/';

  const onSubmit = (data) => {
    const { name, email, photo, password } = data;
    const role = 'user';

    // Example of createUser function usage (you need to adjust this according to your implementation)
    createUser(email, password)
      .then(result => {
        console.log(result.user); // Assuming createUser returns a promise with user information
        const user = { name, email, photo, role };
        // Example of how you might handle additional user data (you should adapt this to your backend/API)
        fetch('http://localhost:5000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          // Update user data in local context/state if needed
          setUser((prevUser) => ({
            ...prevUser,
            displayName: name,
            photoURL: photo
          }));
          // Navigate after successful registration
          navigate(from);
        })
        .catch(error => {
          console.error("Error during user data update:", error);
        });
      })
      .catch(error => {
        console.error("Error during registration:", error);
      });
  };

  return (
    <div className="card shrink-0 w-full mb-6 max-w-sm shadow-2xl bg-base-300 mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered" required />
          {errors.name && <span className="text-red-500">Name is required</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" {...register("email", { required: true })} name="email" placeholder="Email" className="input input-bordered" required />
          {errors.email && <span className="text-red-500">Email is required</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo Url</span>
          </label>
          <input type="text" {...register("photo")} name="photo" placeholder="Photo URL" className="input input-bordered" required />
        </div>
        <div className="relative">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input type={showPassword ? 'text' : 'password'} {...register("password", { required: true })} name="password" placeholder="Password" className="input input-bordered" required />
            <span className="absolute top-[53px] right-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        <div className="form-control mt-6">
          <button type="submit" className="btn w-full btn-primary">Register</button>
          <p className="text-center">Already have an account? Please <span className="text-red-500 font-bold"><Link to='/login'>Login</Link></span></p>
        </div>
      </form>
      <SocialLogin /> {/* Optional: Include Social Login component if needed */}
    </div>
  );
};

export default Register;
