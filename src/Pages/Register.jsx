import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../Providers/AuthProviders";
import SocialLogin from "../Components/SocialLogin";
import { useForm } from "react-hook-form";

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const { createUser, updateUserData, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const from = '/';

  const onSubmit = data => {
    const { name, email, photo, password } = data;
    const role = 'user';

    createUser(email, password)
      .then(result => {
        const user = result.user;
        console.log('From register', user);

        // Update user profile with name and photo
        return updateUserData(user, { displayName: name, photoURL: photo });
      })
      .then(() => {
        // Save user to the database
        return fetch('http://localhost:5000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, photo, role })
        });
      })
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData);
        // Set the updated user in context
        setUser({ displayName: name, photoURL: photo });

        // Navigate to the specified route after successful registration
        navigate(from, { replace: true });
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
          <input
            type="text"
            {...register("name", { required: true })}
            placeholder="name"
            className="input input-bordered"
          />
          {errors.name && <span className="text-red-500">Name is required</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="email"
            className="input input-bordered"
          />
          {errors.email && <span className="text-red-500">Email is required</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo Url</span>
          </label>
          <input
            type="text"
            {...register("photo", { required: true })}
            placeholder="Photo Url"
            className="input input-bordered"
          />
          {errors.photo && <span className="text-red-500">Photo URL is required</span>}
        </div>
        <div className="relative">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              {...register("password", { required: true, minLength: 6 })}
              placeholder="password"
              className="input input-bordered"
            />
            <span className="absolute top-[53px] right-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.password && <span className="text-red-500">Password is required (min 6 characters)</span>}
          </div>
        </div>
        <div className="form-control mt-6">
          <button className="btn w-full btn-primary">Register</button>
          <p className="text-center">Already have an account? Please <span className="text-red-500 font-bold"><Link to='/login'>Login</Link></span></p>
        </div>
      </form>
      <SocialLogin />
    </div>
  );
};

export default Register;
