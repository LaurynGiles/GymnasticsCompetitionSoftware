  import React, {useState, useEffect} from "react";
  import { useNavigate } from "react-router-dom";
  import { useNotifications } from "../utils/connection.jsx";

  const CompBox = ({ competition }) => {

    const { setCompetitionInfo } = useNotifications();
    const [statusMessage, setStatusMessage] = useState("");
    const navigate = useNavigate();

    const handleNavigateToResults = () => {
      setCompetitionInfo(competition);
      localStorage.setItem('currentCompetition', JSON.stringify(competition));
      navigate("/results");
    };

    return (
      <div className="flex flex-col items-center gap-0 py-0 lg:w-[60%] md:w-[85%] w-[90%] h-full border-0 cursor-pointer hover:border-2 hover:border-glaucous"
      onClick={handleNavigateToResults}>
        <div className="flex flex-col items-start gap-2 md:gap-6 px-4 md:px-10 py-4 md:py-8 bg-anti-flash-white rounded-lg w-full h-full">
          <div className="flex items-center justify-center h-[70px] w-[40%] bg-periwinkle rounded-xl md:rounded-3xl px-4">
            <div className="font-montserrat font-medium text-prussian-blue text-xl md:text-2xl text-center">
              {competition.competition_name}
            </div>
          </div>
          <div className="flex flex-col w-full py-2 md:py-4 lg:gap-2">
            <div className="flex justify-between items-center mb-2">
              <div className="text-prussian-blue font-montserrat font-medium text-base md:text-xl md:ml-20">
                <span className="font-bold">Style:</span>
              </div>
              <div className="text-prussian-blue font-montserrat font-medium text-base md:text-xl text-right md:mr-20">
                {`${competition.style} competition`}
              </div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <div className="text-prussian-blue font-montserrat font-medium text-base md:text-xl md:ml-20">
                <span className="font-bold">Date:</span>
              </div>
              <div className="text-prussian-blue font-montserrat font-medium text-base md:text-xl text-right md:mr-20">
                {`[${competition.start_date}] - [${competition.end_date}]`}
              </div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <div className="text-prussian-blue font-montserrat font-medium text-base md:text-xl md:ml-20">
                <span className="font-bold">Location:</span>
              </div>
              <div className="text-prussian-blue font-montserrat font-medium text-base md:text-xl text-right md:mr-20">
                {`${competition.location}`}
              </div>
            </div>
            {statusMessage && 
              <div className="text-dark-prussian-blue font-montserrat font-medium text-base md:text-xl text-center mt-2">
                {statusMessage}
              </div>
            }
          </div>
        </div>
      </div>
    );
  };

  export default CompBox;