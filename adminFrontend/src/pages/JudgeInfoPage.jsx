import React, { useState, useEffect } from "react";
import NavigationBar from "../components/NavigationBar";
import ConfigHeader from "../components/ConfigHeader";
import AddButton from "../components/AddButton";
import JudgeHeaders from "../components/JudgeHeaders";
import PageHeader from "../components/PageHeader";
import JudgeTableRow from "../components/JudgeTableRow";
import XIcon from "../components/XIcon";
import BarsIcon from "../components/BarsIcon";
import StartButton from "../components/StartButton";
import { useNavigate } from "react-router-dom";

const JudgeInfoPage = () => {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const navigate = useNavigate();

  const [judges, setJudges] = useState(() => {
    const savedJudges = localStorage.getItem("judges");
    // Initialize with an empty judge element if none exist
    const parsedJudges = savedJudges ? JSON.parse(savedJudges).map(judge => ({
      ...judge,
      level: Number(judge.level),
      gsa_id: Number(judge.gsa_id), // Ensure GSAId is a number
    })) : [{ id: 1, gsa_Id: null, first_name: "", last_name: "", club: "", level: null, head_judge: false, role: "" }];

    return parsedJudges;
  });

  useEffect(() => {
    if (judges.length > 0) {
      localStorage.setItem("judges", JSON.stringify(judges));
    } else {
      localStorage.removeItem("judges");
    }
  }, [judges]);

  const handleAddJudge = () => {
    const newId = judges.length > 0 
      ? Math.max(...judges.map(j => j.id)) + 1 
      : 1;

    const newJudge = { 
      id: newId,
      gsa_id: null,
      first_name: "",
      last_name: "",
      club: "",
      level: null,
      head_judge: false,
      role: ""
    };
    setJudges(prevJudges => [...prevJudges, newJudge]);
  };

  const handleUpdateJudge = (id, updatedFields) => {
    const updatedJudges = judges.map(judge =>
      judge.id === id ? { ...judge, ...updatedFields } : judge
    );
    setJudges(updatedJudges);
  };

  const handleRemoveJudge = (id) => {
    // Do not remove the first judge (default judge)
    if (id === 1) return; 

    const updatedJudges = judges.filter(judge => judge.id !== id);
    // Check if the list is empty, if so add the default judge back
    if (updatedJudges.length === 0) {
      updatedJudges.push({ id: 1, gsa_id: null, first_name: "", last_name: "", club: "", level: null, head_judge: false, role: "" });
    }
    setJudges(updatedJudges);
  };

  const handleContinue = () => {
    navigate("/completeSetup")
  };

  return (
    <div className={`flex w-full left-0 h-screen bg-bright-white`}>
      {isNavVisible && <NavigationBar />}
      
      <div className={`flex-1 mb-20 bg-bright-white p-5`} style={{ marginLeft: isNavVisible ? '18%' : '0', width: isNavVisible ? 'calc(100% - 18%)' : '100%' }}>
        <BarsIcon onClick={() => setIsNavVisible(!isNavVisible)}/>
        <div className={`w-full ml-20 ${isNavVisible ? 'max-w-[1300px]' : 'max-w-[1600px]'} mx-auto gap-10`}>
          <PageHeader title="Judge Info Configuration" />

          <div className="flex flex-col gap-10">
            <ConfigHeader text="Judges" />


            <div className={`flex flex-col gap-4 bg-white p-5 rounded-lg`}>
              
              <div className="flex flex-row gap-4">

                <div className="w-[97%] flex flex-col gap-2">
                  {judges.map((judge, index) => {
                    console.log(judge.head_judge);

                      return (
                        <JudgeTableRow
                            key={judge.id}
                            ID={judge.id}
                            GSAId={judge.gsa_id}
                            f_name={judge.first_name}
                            l_name={judge.last_name}
                            club={judge.club}
                            level={judge.level}
                            headJudge={judge.head_judge}
                            role={judge.role}
                            onUpdate={(updatedFields) => handleUpdateJudge(judge.id, updatedFields)}
                            showTitle={index===0}
                        />
                      );
                    })}
                </div>

                {/* XIcons for each group */}
                <div className="flex flex-col items-start">
                {judges.map((judge, index) => (
                    <div
                      className={`flex justify-end ${index === 0 ? 'pt-[60px] pb-[54px]' : 'py-[23px]'}`} 
                      key={judge.id}
                    >
                      <XIcon className="cursor-pointer" onClick={() => handleRemoveJudge(judge.id)} isVisible={index!==0}/>
                    </div>
                  ))}
                </div>

              </div>
            </div>
            <div className="flex justify-center py-5">
              <AddButton title="+" onClick={handleAddJudge} />
            </div>
          </div>

        </div>

        <div className="flex justify-center items-center p-5 bg-bright-white">
          <StartButton onClick={handleContinue} title={"Continue"} />
        </div>
      </div>
    </div>
  );
};

export default JudgeInfoPage;
