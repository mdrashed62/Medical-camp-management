import { useEffect, useState } from "react";
import FeedbackCard from "./FeedbackCard";

const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/feedback")
      .then((res) => res.json())
      .then((data) => setFeedbacks(data));
  }, []);

  return (
    <div className="mb-6">
      <h1 className="text-5xl text-center font-bold mb-4" >Feedbacks</h1>
      {feedbacks.map((feedback) => (
        <FeedbackCard key={feedback._id} afeedback={feedback} />
      ))}
    </div>
  );
};

export default Feedbacks;

