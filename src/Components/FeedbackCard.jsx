const FeedbackCard = ({ afeedback }) => {
  return (
   <div className="p-4 border flex">
     <div className=" p-6 mt-4 flex-grow bg-[#EAF0FF] rounded transform transition-transform duration-300 hover:scale-105">
      <h2 className="text-2xl">Name: {afeedback.participantName}</h2>
      <h3 className="font-semibold">Camp Name: {afeedback.campName}</h3>
      <p>Feedback: {afeedback.feedback}</p>
    </div>
   </div>
  );
};

export default FeedbackCard;
