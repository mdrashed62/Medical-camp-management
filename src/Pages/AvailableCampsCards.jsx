import { Link } from "react-router-dom";

const AvailableCampsCards = ({ camp }) => {
  const {_id, campName, image, dateTime, location, healthcareProfessional, participantCount, description } = camp;
  console.log(camp, 'frrooewr')
  return (
    <div className="transform transition-transform duration-300 hover:scale-10">
      <div className="card  bg-[#EAF0FF] shadow-xl h-full flex flex-col justify-between">
        <figure className="p-4">
          <img src={image} className="rounded-xl h-40"/>
        </figure>
        <div className="card-body">
          <div>
            <h2 className="font-semibold">{campName}</h2>
            <p>Participant: {participantCount}</p>
          </div>
          <div className="flex justify-between gap-2">
            <h2>Date And Time: {dateTime}$</h2>
          </div>
          <p>Location: {location}</p>
          <p className="text-sm">description: {description}</p>

          <p className="font-semibold">{healthcareProfessional}</p>
          <div className="w-full ">
            <Link to={`/addedCampsDetails/${_id}`}>
              {" "}
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

export default AvailableCampsCards;
