import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../Providers/AuthProviders";
import SocialLogin from "../Components/SocialLogin";
import { useForm } from "react-hook-form";



const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const { createUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const from = '/';


  const onSubmit = data => {
    const { name, email, photo, password } = data;
    const role = 'user';

    createUser(email, password)
      .then(result => {
        console.log(result.user);
        const user = { name, email, photo, role };
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
        });
      })
      .catch(error => {
        console.error("Error during registration:", error);
      });
    navigate(from);
  };

  return (
    <div className="card shrink-0 w-full mb-6 max-w-sm shadow-2xl bg-base-300 mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" {...register("name")} name='name' placeholder="name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" {...register("email", { required: true })} name='email' placeholder="email" className="input input-bordered" required />
          {errors.name && <span className="text-red-500">Email is required</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo Url</span>
          </label>
          <input type="text" {...register("photo")} name='photo' placeholder="Photo Url" className="input input-bordered" required />
        </div>
        <div className="relative">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input type={showPassword ? 'text' : 'password'} {...register("password")} placeholder="password" name='password' className="input input-bordered" required />
            <span className="absolute top-[53px] right-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
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
