import { Link } from "react-router-dom";
import PopularDataCards from "../../Components/PopularDataCards";
// import SuccessStory from "./SuccessStory";

const PopularCamp = ({ camps }) => {
  return (
    <div>
      <div>
      <h3 className="text-5xl font-bold text-center mb-4 lg:mb-8 lg:mt-10">Our Popular Medical Camps!</h3>
      <div className="grid .camp-card grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {camps.map((camp) => (
          <PopularDataCards key={camp._id} camp={camp} />
        ))}
      </div>
     <div className="py-5 w-1/3 mx-auto transform transition-transform duration-300 hover:scale-105">
     <Link to="/availableCamps"><button className="py-[6px] rounded w-full mb-4 bg-[#5B74FF] text-white">See All Camps</button></Link>
     </div>
    </div>
    {/* <SuccessStory></SuccessStory> */}
    </div>
  );
};

export default PopularCamp;
