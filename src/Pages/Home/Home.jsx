import { useEffect, useState } from "react";
import Banner from "./Banner/Banner";
import PopularCamp from "./PopularCamp";
import axios from "axios";
import Feedbacks from "../../Components/Feedbacks";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [camps, setCamps] = useState([]);

  useEffect(() => {
    const getCampsData = async () => {
      const response = await axios.get(
        "https://medical-camp-management-server-a12.vercel.app/popularData"
      );
      setCamps(response.data);
    };
    getCampsData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.search.value);
  };

  const filteredCamps = camps.filter(
    (camp) =>
      camp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      camp.dateTime.toLowerCase().includes(searchTerm.toLowerCase()) ||
      camp.healthcareProfessional
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <form onSubmit={handleSearch} className="flex">
        <input
          type="text"
          placeholder="Search for camp"
          name="search"
          className=" rounded pl-4 w-2/3 bg-[#EAF0FF]"
        />
        <button
          type="submit"
          className="py-[6px] hover:bg-black text-white font-semibold rounded ml-4 w-1/3 bg-[#5B74FF]"
        >
          Search
        </button>
      </form>
      <Banner />
      <PopularCamp camps={filteredCamps} />
      <Feedbacks></Feedbacks>
    </div>
  );
};

export default Home;
