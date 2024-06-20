import review from '../../assets/review.jpeg'
import { FaStar } from "react-icons/fa";

const SuccessStory = () => {
    return (
        <div>
           <div className=" lg:pl-2">
    <h2 className="text-center font-bold text-2xl lg:text-6xl text-green-500 mb-6"> Reviewers</h2>
    <div className=" gap-5 flex flex-col lg:flex-col mb-6">
      
      {/* Reviewers Section */}
      <div className="flex-1 shadow-2xl p-4 mb-4 rounded-lg border">
        <p className="text-4xl  text-center font-semibold mb-8">Reviewer</p>
        <div className="flex justify-center">
        <img className="rounded-lg" src={review} alt="" />
        </div>
        <div className="flex-1 mt-7 shadow-2xl p-4 rounded-lg border">
          <div className="p-2 bg-[#003285] rounded-lg">
            <p className="text-xl font-semibold text-white">User Reviews with Ratings:</p>
            <p className='flex items-center gap-3  text-xl text-white'>Rating: 5 Stars <FaStar className='text-yellow-500'></FaStar> <FaStar className='text-yellow-500'></FaStar><FaStar className='text-yellow-500'></FaStar><FaStar className='text-yellow-500'></FaStar><FaStar className='text-yellow-500'></FaStar></p>
            <p className='text-white'>Attending the cardio health camp was a life-changing experience. The doctors were knowledgeable, and the personalized care I received helped me manage my heart condition better. Highly recommend!</p>
            <p className='font-semibold text-white'>Participant: John Doe</p>
            <p className='text-white'>Date: June 2023</p>
          </div>
          <div className="p-2 mt-4 mb-4 bg-[#003285] rounded-lg">
            <p className="text-xl font-semibold text-white">User Reviews with Ratings:</p>
            <p className='flex items-center gap-3 text-white text-xl'>Rating: 4 Stars <FaStar className='text-yellow-500'></FaStar> <FaStar className='text-yellow-500'></FaStar><FaStar className='text-yellow-500'></FaStar><FaStar className='text-yellow-500'></FaStar></p>
            <p className='text-white'>Great initiative! I learned a lot about diabetes management during the camp. The workshops were informative, and the support from the medical staff was exceptional.!</p>
            <p className='font-semibold text-white'>Participant: Sarah Smith</p>
            <p className='text-white'>Date: May 2023</p>
          </div>
          <div className="p-2 bg-[#003285] rounded-lg">
            <p className="text-xl font-semibold text-white">User Reviews with Ratings:</p>
            <p className='flex items-center gap-3  text-xl text-white'>Rating: 4 Stars <FaStar className='text-yellow-500'></FaStar> <FaStar className='text-yellow-500'></FaStar><FaStar className='text-yellow-500'></FaStar><FaStar className='text-yellow-500'></FaStar></p>
            <p className='text-white'>The camp exceeded my expectations. The nutrition counseling was practical, and I appreciated the focus on holistic health. Feeling healthier and more confident!</p>
            <p className='font-semibold text-white'>Participant: Michael Brown</p>
            <p className='text-white'>Date: April 2023</p>
          </div>
        </div>
      </div>
      
    </div>
  </div>
        </div>
    );
};

export default SuccessStory;