import { Link } from "react-router-dom";


const PopularDataCards = ({camp}) => {
    const {name, image, location, participantCount, dateTime, fees, healthcareProfessional
    } = camp;
    return (
        <div className="mb-4">
             <div className="card  bg-base-100 shadow-xl">
      <figure className="px-10 pt-10">
        <img src={image} className="rounded-xl h-64 w-96" />
      </figure>
      <div className="card-body items-center text-center">
       
        <div className="">
        <h2 className="card-title">{name}</h2>
        <p className="font-bold">Participant: {participantCount}</p>
        </div>
        <p>{location}</p>
        <div className="flex justify-between gap-6">
        <p>{healthcareProfessional}</p>
        <h2>Fee: {fees}$</h2>
        </div>
        
        <p>{dateTime}</p>
        
        <div className="w-full ">
          <Link to={`/campDetails/${name}`}>
            {" "}
            <button className="btn mt-4 md:20 lg:px-24 text-white bg-[#071952]">
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