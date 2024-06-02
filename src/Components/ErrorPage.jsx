import { Link } from "react-router-dom";
import errorImg from '../assets/error.jpg'

const ErrorPage = () => {
    return (
        <div className="text-red-500 w-full">
            <img className="w-1/2 h-96 mt-6 mx-auto" src={errorImg} alt="" />
           <div className="flex w-1/2 mx-auto justify-center">
           <Link className="w-full" to="/"><button className="btn text-xl font-bold text-white bg-[#7469B6] w-full mt-2 ">Go to Home page</button></Link>
           </div>
        </div>
       
    );
};

export default ErrorPage;