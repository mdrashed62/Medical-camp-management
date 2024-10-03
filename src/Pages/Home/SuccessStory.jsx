
import { FaStar } from "react-icons/fa";

const SuccessStory = () => {
  return (
    <div>
      <div className="lg:pl-2">
        <h2 className="text-center font-bold text-2xl lg:text-6xl mb-6">
          Reviewers
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
          <div className="p-4 rounded border">
            <div className="p-4 mt-4 bg-[#EAF0FF] rounded transform transition-transform duration-300 hover:scale-105">
              <p className="flex items-center gap-3 text-xl text-black">
                Rating: 5 Stars
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
              </p>
              <p className="text-black">
                Attending the cardio health camp was a life-changing experience.
                The doctors were knowledgeable, and the personalized care I
                received helped me manage my heart condition better. Highly
                recommend!
              </p>
              <p className="font-semibold text-black">Participant: John Doe</p>
              <p className="text-black">Date: June 2023</p>
            </div>
          </div>

          <div className=" p-4 rounded border">
            <div className="p-4 mt-4 bg-[#EAF0FF] rounded transform transition-transform duration-300 hover:scale-105">
              <p className="flex items-center gap-3 text-xl text-black">
                Rating: 4 Stars
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
              </p>
              <p className="text-black">
                Great initiative! I learned a lot about diabetes management
                during the camp. The workshops were informative, and the support
                from the medical staff was exceptional.
              </p>
              <p className="font-semibold text-black">
                Participant: Sarah Smith
              </p>
              <p className="text-black">Date: May 2023</p>
            </div>
          </div>

          <div className=" p-4 rounded border">
            <div className="p-4 mt-4 bg-[#EAF0FF] rounded transform transition-transform duration-300 hover:scale-105">
              <p className="flex items-center gap-3 text-xl text-black">
                Rating: 4 Stars
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
              </p>
              <p className="text-black">
                The camp exceeded my expectations. The nutrition counseling was
                practical, and I appreciated the focus on holistic health.
                Feeling healthier and more confident!
              </p>
              <p className="font-semibold text-black">
                Participant: Michael Brown
              </p>
              <p className="text-black">Date: April 2023</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessStory;
