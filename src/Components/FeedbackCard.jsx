const FeedbackCard = ({ afeedback }) => {
    return (
      <div className="bg-teal-300 p-6 mt-3 rounded-full">
        <h2 className="text-2xl">Name: {afeedback.participantName}</h2>
        <h3 className="font-semibold">Camp Name: {afeedback.campName}</h3>
        <p>Feedback: {afeedback.feedback}</p>
      </div>
    );
  };
  
  export default FeedbackCard;
  