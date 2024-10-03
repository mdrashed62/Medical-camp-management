import { Link } from "react-router-dom";

const PopularDataCards = ({ camp }) => {
  const {
    _id,
    name,
    image,
    location,
    participantCount,
    dateTime,
    fees,
    healthcareProfessional,
  } = camp || {};

  return (
    <div className=" camp-card h-full transform transition-transform duration-300 hover:scale-105"> 
      <div className="card bg-[#EAF0FF] h-full flex flex-col justify-between"> {/* Use flex and h-full for uniform height */}
        <figure className="px-4 pt-4">
          <img src={image} className="rounded h-40 object-cover" alt={name} /> {/* object-cover keeps the image proportions consistent */}
        </figure>
        <div className="card-body items-center text-center flex-grow text-sm">
          <div>
            <h2 className=" font-semibold">{name}</h2>
            <p className="font-medium text-sm">Participant: {participantCount}</p>
          </div>
          <p>{location}</p>
          <div className="flex justify-between gap-4 text-sm">
            <p className="font-semibold text-green-500">{healthcareProfessional}</p>
            <h2>Fee: {fees}$</h2>
          </div>
          <p>{dateTime}</p>
          <div className="w-full">
            <Link to={`/popularCampDetails/${_id}`} className="w-full">
              <button className="py-[6px] hover:bg-black hover:text-white rounded mt-4 w-full text-white bg-[#5B74FF]">
                View Details
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularDataCards;
