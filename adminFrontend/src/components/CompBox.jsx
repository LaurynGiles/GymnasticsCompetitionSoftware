  import React, {useState, useEffect} from "react";
  import TinyBlueButton from "./TinyBlueButton";
  import ArrowIcon from "./ArrowIcon";
  // import GymnastList from "./GymnastList";
  import { useNotifications } from "../utils/connection.jsx";
  import { useNavigate } from "react-router-dom";

  const EventBox = ({ competition_name, start_date, end_date, location, style }) => {

    const { socket } = useNotifications();
    const [statusMessage, setStatusMessage] = useState("");
    const navigate = useNavigate();

    const handleJudgeHome = async () => {
    //   try {
    //       const joinResult = await handleJoinGroup(group_id);
  
    //       if (joinResult === 'headJudge') {
    //         setCurrApparatus(apparatus);
    //         console.log(`Number of gymnasts: ${gymnasts.length}`);
    //         setTotalGymnasts(gymnasts.length);
    //         navigate("/lobby");
    //       }
  
    //   } catch (error) {
    //     console.log(error);
    //     setError(error || "Error connecting to server");
    //     setShowError(true);
    //   }
    };

    return (
      <div className="flex flex-col items-center gap-0 py-0 lg:w-[60%] md:w-[85%] w-[90%] h-full border-0 cursor-pointer hover:border-2 hover:border-glaucous">
        <div className="flex flex-col items-start gap-2 md:gap-6 px-4 md:px-10 py-4 md:py-8 bg-anti-flash-white rounded-lg w-full h-full">
          <div className="flex items-center justify-center h-[70px] w-[40%] bg-periwinkle rounded-xl md:rounded-3xl px-4">
            <div className="font-montserrat font-medium text-prussian-blue text-xl md:text-2xl text-center">
              {competition_name}
            </div>
          </div>
          <div className="flex flex-col w-full py-2 md:py-4 lg:gap-2">
            <div className="flex justify-between items-center mb-2">
              <div className="text-prussian-blue font-montserrat font-medium text-base md:text-xl md:ml-20">
                <span className="font-bold">Style:</span>
              </div>
              <div className="text-prussian-blue font-montserrat font-medium text-base md:text-xl text-right md:mr-20">
                {`${style} competition`}
              </div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <div className="text-prussian-blue font-montserrat font-medium text-base md:text-xl md:ml-20">
                <span className="font-bold">Date:</span>
              </div>
              <div className="text-prussian-blue font-montserrat font-medium text-base md:text-xl text-right md:mr-20">
                {`[${start_date}] - [${end_date}]`}
              </div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <div className="text-prussian-blue font-montserrat font-medium text-base md:text-xl md:ml-20">
                <span className="font-bold">Location:</span>
              </div>
              <div className="text-prussian-blue font-montserrat font-medium text-base md:text-xl text-right md:mr-20">
                {`${location}`}
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

  export default EventBox;