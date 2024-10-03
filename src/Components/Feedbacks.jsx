import { useEffect, useState } from "react";
import FeedbackCard from "./FeedbackCard";

const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetch("https://medical-camp-management-server-a12.vercel.app/feedback")
      .then((res) => res.json())
      .then((data) => setFeedbacks(data));
  }, []);

  return (
    <div className="mb-6 lg:mt-10">
      <h1 className="text-5xl text-center font-bold mb-4">Patient Feedbacks from the Camp</h1>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-4">
      {feedbacks.map((feedback) => (
        <FeedbackCard key={feedback._id} afeedback={feedback}/>
      ))}
      </div>
    </div>
  );
};

export default Feedbacks;
