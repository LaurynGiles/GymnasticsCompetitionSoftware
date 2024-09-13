import React, { useState, useEffect } from "react";
// import NavigationBarDefault from "../components/NavigationBarDefault";
import SelectBox from "../components/SelectBox";
import Header from "../components/Header";
import BlockHeader from "../components/BlockHeader";
import { useNotifications } from "../utils/connection.jsx";
import { getCompetitionsByAdmin } from "../utils/api.js";
import CompBox from "../components/CompBox.jsx"
import { useNavigate } from "react-router-dom";
import Popup from "../components/Popup.jsx";
import PlusIcon from "../components/PlusIcon.jsx";

const HomeAdmin = () => {

  const { adminInfo } = useNotifications();
  const [compBoxes, setCompBoxes] = useState([]);
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
      const fetchCompetitions = async () => {
          const response = await getCompetitionsByAdmin(adminInfo.admin_id);

          if (response.success) {
              setCompBoxes(response.data);
          } else {
              setError(response.message);
          }
      };

      fetchCompetitions();

  }, [adminInfo.admin_id]);

  const handleJudgeHome = async () => {
      navigate("/createWelcome");
  };

  return (
      <div className="bg-bright-white w-full h-screen">
        <div className="flex flex-col items-center overflow-y-auto w-full pt-10 pb-10 gap-10">
          <BlockHeader text="Administrator Competitions"/>
          
          <div className="w-full md:px-[20%] px-4 text-left">
              <Header text="Select a Competition"/>
          </div>
  
          <div className="flex flex-col items-center w-full h-full gap-12 px-10 ">
            {compBoxes.map(compBox => (
              <CompBox
                key={compBox.competition_id}
                competition_name={compBox.competition_name}
                start_date={compBox.start_date}
                end_date={compBox.end_date}
                location={compBox.location}
                style={compBox.style}
                setShowError={setShowError}
                setError={setError}
              />
            ))}
          </div>

          <div className="w-full md:px-[20%] px-4 text-left">
              <Header text="Create a Competition"/>
          </div>

          <div className="flex flex-col items-center w-[60%] md:w-[30%] h-full border-0 bg-glaucous hover:border-2 hover:border-prussian-blue cursor-pointer rounded-xl py-2"
              onClick={handleJudgeHome}>
            <PlusIcon />
          </div>
        </div>
        {showError && <Popup message={error} onClose={() => setShowError(false)} />}
      </div>
  );
};

export default HomeAdmin;