import { useEffect, useState } from "react";
import AvailableCampsCards from "./AvailableCampsCards";

const AvailableCamps = () => {
  const [availableCamps, setAvailableCamps] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch("https://medical-camp-management-server-a12.vercel.app/addedCamps")
      .then((res) => res.json())
      .then((data) => setAvailableCamps(data))
      .catch((error) => console.error("Error fetching camps:", error));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.search.value);
    setCurrentPage(1);
  };

  // Ensure availableCamps is an array before filtering
  const filteredCamps =
    availableCamps.length > 0
      ? availableCamps.filter(
          (camp) =>
            (camp.name &&
              camp.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (camp.dateTime &&
              camp.dateTime.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (camp.healthcareProfessional &&
              camp.healthcareProfessional
                .toLowerCase()
                .includes(searchTerm.toLowerCase()))
        )
      : [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCamps = filteredCamps.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredCamps.length / itemsPerPage);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 lg:mt-8">
        {currentCamps.map((camp) => (
          <AvailableCampsCards key={camp._id} camp={camp}></AvailableCampsCards>
        ))}
      </div>
      <div className="flex justify-center mt-4 mb-4">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handleClick(index + 1)}
            className={`px-4 py-2 mx-1 ${
              index + 1 === currentPage
                ? "bg-blue-500 text-white"
                : "bg-gray-300"
            } rounded`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AvailableCamps;
