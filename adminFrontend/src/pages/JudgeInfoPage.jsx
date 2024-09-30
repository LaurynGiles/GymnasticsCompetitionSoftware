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

const JudgeInfoPage = () => {
  const [isNavVisible, setIsNavVisible] = useState(true);

  const [judges, setJudges] = useState(() => {
    const savedJudges = localStorage.getItem("judges");
    return savedJudges ? JSON.parse(savedJudges).map(judge => ({
      ...judge,
      level: Number(judge.level),
      GSAId: Number(judge.GSAId), // Ensure GSAId is a number
    })) : [];
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
      GSAId: null,
      f_name: "",
      l_name: "",
      club: "",
      level: null,
      headJudge: false,
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
    const updatedJudges = judges.filter(judge => judge.id !== id);
    setJudges(updatedJudges);

    // Check if judges are empty and remove from local storage if so
    if (updatedJudges.length === 0) {
      localStorage.removeItem("judges");
    } else {
      localStorage.setItem("judges", JSON.stringify(updatedJudges));
    }
  };

  const handleContinue = () => {
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


            <div className={`flex flex-col gap-4 bg-white p-5 rounded-lg shadow-md`}>
              <JudgeHeaders />
              
              <div className="flex flex-row gap-4">

                <div className="rounded-lg w-[97%]">
                  {judges.map(judge => {
                      return (
                        <JudgeTableRow
                            ID={judge.id}
                            GSAId={judge.GSAId}
                            f_name={judge.f_name}
                            l_name={judge.l_name}
                            club={judge.club}
                            level={judge.level}
                            headJudge={judge.headJudge}
                            role={judge.role}
                            onUpdate={(updatedFields) => handleUpdateJudge(judge.id, updatedFields)}
                        />
                      );
                    })}
                </div>

                {/* XIcons for each group */}
                <div className="flex flex-col items-start">
                  {judges.map(judge => (
                    <div className="flex justify-end py-[16px]" key={judge.id}>
                      <XIcon className="cursor-pointer" onClick={() => handleRemoveJudge(judge.id)} />
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
