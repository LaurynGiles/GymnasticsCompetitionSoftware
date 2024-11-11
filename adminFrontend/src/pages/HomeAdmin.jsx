import React, { useState, useEffect } from "react";
// import NavigationBarDefault from "../components/NavigationBarDefault";
import SelectBox from "../components/SelectBox";
import Header from "../components/Header";
import HomeBlockHeader from "../components/HomeBlockHeader";
import { useNotifications } from "../utils/connection.jsx";
import { getCompetitionsByAdmin, getApparatusByCompetition, getQualificationsByCompetition } from "../utils/api.js";
import CompBox from "../components/CompBox.jsx"
import { useNavigate } from "react-router-dom";
import Popup from "../components/Popup.jsx";
import PlusIcon from "../components/PlusIcon.jsx";

const HomeAdmin = () => {

  const { adminInfo, socket } = useNotifications();
  const [compBoxes, setCompBoxes] = useState([]);
  // const [compApparatuses, setCompApparatuses] = useState([]);
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedCompBoxes = JSON.parse(localStorage.getItem('compBoxes')) || [];
    setCompBoxes(storedCompBoxes);
  }, []);

  // Fetch competitions from the API
  useEffect(() => {
    const fetchCompetitions = async () => {
      const response = await getCompetitionsByAdmin(adminInfo.admin_id);

      if (response.success) {
        setCompBoxes(response.data);
        localStorage.setItem('compBoxes', JSON.stringify(response.data)); // Save to local storage

      } else {
        setError(response.message);
      }
    };

    fetchCompetitions();
  }, [adminInfo.admin_id]);


  const handleJudgeHome = () => {
      navigate("/createWelcome");
  };

  const logout = () => {
    if (socket && adminInfo) {
      socket.emit("adminLogout", { admin_id: adminInfo.admin_id }); // Emit logout event
      console.log(`Admin ${adminInfo.admin_id} logged out`);
    }

    // Clear any relevant local data
    localStorage.removeItem("compBoxes");
    navigate("/login"); // Navigate back to the admin login page
  };

  return (
      <div className="bg-bright-white w-full h-screen">
        <div className="flex flex-col items-center overflow-y-auto w-full pt-10 pb-10 gap-10">
          <HomeBlockHeader text="Administrator Competitions" exitOnClick={logout}/>
          
          <div className="w-full md:px-[20%] px-4 text-left">
              <Header text="Select a Competition"/>
          </div>
  
          <div className="flex flex-col items-center w-full h-full gap-12 px-10 ">
            {compBoxes.map(compBox => (
              <CompBox
                key={compBox.competition_id}
                competition={compBox}
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