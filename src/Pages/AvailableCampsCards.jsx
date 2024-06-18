import { Link } from "react-router-dom";

const AvailableCampsCards = ({ camp }) => {
  const {_id, name, image, dateTime, location, healthcareProfessionalName, participantCount, description } = camp;
  return (
    <div className="mb-4">
      <div className="card  bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <img src={image} className="rounded-xl h-64 w-96" />
        </figure>
        <div className="card-body items-center text-center">
          <div>
            <h2>{name}</h2>
            <p className="font-bold">Participant: {participantCount}</p>
          </div>
          <p>{location}</p>
          <div className="flex justify-between gap-6">
            <h2>Date And Time: {dateTime}$</h2>
          </div>
          <p>Location: {location}</p>
          <p>description: {description}</p>

          <p className="font-semibold">{healthcareProfessionalName}</p>

          <div className="w-full ">
            <Link to={`/addedCampsDetails/${_id}`}>
              {" "}
              <button className="btn mt-4 md:20 lg:px-24 text-white bg-emerald-500">
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
