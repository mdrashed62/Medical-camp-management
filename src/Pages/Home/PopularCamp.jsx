import { useEffect, useState } from "react";
import PopularDataCards from "../../Components/PopularDataCards";

const PopularCamp = () => {
    const [popularData, setPopularData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/popularData')
        .then(res => res.json())
        .then(data => setPopularData(data))
    }, []);

    return (
        <div>
            <h3 className="text-5xl font-bold text-center mb-4">Our Popular Medical Camps!</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {popularData?.map((item) => (
                    <PopularDataCards key={item._id} camp={item} />
                ))}
            </div>
        </div>
    );
};

export default PopularCamp;
