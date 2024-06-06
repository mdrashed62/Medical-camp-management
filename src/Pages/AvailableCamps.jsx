import { useEffect, useState } from "react";
import AvailableCampsCards from "./AvailableCampsCards";


const AvailableCamps = () => {
    const [availableCamps, setAvailableCamps] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/addedCamps')
        .then(res => res.json())
        .then(data => setAvailableCamps(data))
    }, []);
    
    return (
        <div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    availableCamps.map(camp => <AvailableCampsCards key={camp._id} camp={camp}></AvailableCampsCards>)
                }
            </div>
        </div>
    );
};

export default AvailableCamps;