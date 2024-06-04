
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../Providers/AuthProviders";
import useAxiosPublic from "../Components/Hooks/useAxiosPublic";
import SocialLogin from "../Components/SocialLogin";



const Register = () => {
  const axiosPublic = useAxiosPublic();
  const [registerError, setRegisterError] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  
    const {createUser, updateUserData, setUser} = useContext(AuthContext)
    const navigate = useNavigate()
    const from = '/'

    const handleRegister = (e) =>{
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const name = form.get('name');
        const email = form.get('email');
        const photo = form.get('photo')
        const password = form.get('password');
        // console.log(name, email, photo, password)

        if(password.length < 6){
          setRegisterError('Password must be at least 6 characters or longer');
          return;
        }
        else if (!/[A-Z]/.test(password)){
            setRegisterError('Your Password should have at least one uppercase characters.')
            return;
        }
        else if (!/[a-z]/.test(password)){
            setRegisterError('Your Password should have at least one lowercase characters.')
            return;
        }

        setRegisterError('')
       

        //create user
        createUser(email, password, name, photo)
        .then(result =>{
            console.log(result.user)
            updateUserData(name, photo) 
            .then(() =>{
              setUser((prevUser)=> {
                return {...prevUser, displayName:name, photoURL: photo};
              })

              const userInfo = {
                name: name,
                email: email
              }
             axiosPublic.post('/users', userInfo)
             .then(res => {
              if(res.data.insertedId){
                console.log('user added to the database')
                Swal.fire({
                  position: "top",
                  icon: "success",
                  title: "Registration Successful",
                  showConfirmButton: false,
                  timer: 2000
                });
                navigate(from)
                e.target.reset()
              }
             })
              
            })
        })
        
        .catch(error =>{
            console.error(error)
        })
    }

    return (
        <div className="card shrink-0  w-full mb-6 max-w-sm shadow-2xl bg-base-300 mx-auto">
      <form onSubmit={handleRegister} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" name='name' placeholder="name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name='email' placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo Url</span>
          </label>
          <input type="text" name='photo' placeholder="Photo Url" className="input input-bordered" required />
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
          {
           registerError && <p className="text-red-500">{registerError}</p>
          }
        </div>
       </div>
        <div className="form-control mt-6">
         <button className="btn w-full btn-primary">Register</button>
          <p className="text-center">Already have an account? please <span className="text-red-500 font-bold"><Link to='/login'>Login</Link></span></p>
        </div>
      </form>
      <SocialLogin></SocialLogin>
    </div>
    );
};

export default Register;