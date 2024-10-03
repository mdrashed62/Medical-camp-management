import { useLoaderData, useParams } from "react-router-dom";
import CampRegistrationModal from "../Components/CampRegistrationModal";

const PopularCampDetails = () => {
  const popularData = useLoaderData();
  const { id } = useParams();
  const popular = popularData.find((item) => item._id === id);
  const {
    name,
    image,
    description,
    location,
    participantCount,
    dateTime,
    fees,
    healthcareProfessional,
  } = popular;

  return (
    <div>
      <div className="flex flex-col px-4 mb-6 lg:px-10">
        <div className="flex-1 flex justify-center">
          <img className="lg:w-[600px] rounded" src={image} alt="" />
        </div>
        <div className="flex-1">
          <div className="border-b-2 text-center lg:text-start">
            <div className="flex items-center gap-6">
              <h3 className="text-3xl mt-6 font-semibold">{name}</h3>
            </div>
            <p className="mt-2 mb-2 font-semibold">{description}</p>
            <div className="flex gap-8 lg:gap-20 border-t-2">
              <p className="font-semibold text-2xl">Location: {location}</p>
              <p className="font-semibold text-2xl">Service Price: ${fees}</p>
            </div>
            <p>Participants: {participantCount}</p>
          </div>
          <div className="flex border-b-2 items-center">
            <div className="mt-2 text-center font-semibold lg:text-start">
              <h1 className="text-2xl font-bold">Provider Info:</h1>
              <div>
                <p className="mb-2 text-xl">Date And Time: {dateTime}</p>
                <p className="mb-2 text-xl">{healthcareProfessional}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <button
            className="btn text-white w-full mt-2 text-xl font-semibold bg-[#071952]"
            onClick={() =>
              document.getElementById("campRegistrationModal").showModal()
            }
          >
            Join Camp
          </button>
        </div>
      </div>
      <CampRegistrationModal camp={popular} />
    </div>
  );
};

export default PopularCampDetails;
