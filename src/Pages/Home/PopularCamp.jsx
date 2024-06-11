import PopularDataCards from "../../Components/PopularDataCards";

const PopularCamp = ({ camps }) => {
  return (
    <div>
      <h3 className="text-5xl font-bold text-center mb-4">Our Popular Medical Camps!</h3>
      <div className="grid .camp-card grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {camps.map((camp) => (
          <PopularDataCards key={camp._id} camp={camp} />
        ))}
      </div>
    </div>
  );
};

export default PopularCamp;
