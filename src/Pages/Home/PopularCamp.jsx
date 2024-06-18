import { Link } from "react-router-dom";
import PopularDataCards from "../../Components/PopularDataCards";
import SuccessStory from "./SuccessStory";

const PopularCamp = ({ camps }) => {
  return (
    <div>
      <div>
      <h3 className="text-5xl font-bold text-center mb-4">Our Popular Medical Camps!</h3>
      <div className="grid .camp-card grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {camps.map((camp) => (
          <PopularDataCards key={camp._id} camp={camp} />
        ))}
      </div>
      <Link to="/availableCamps"><button className="btn w-full mb-4 bg-[#003285] text-white">See All Camps</button></Link>
    </div>
    <SuccessStory></SuccessStory>
    </div>
  );
};

export default PopularCamp;
