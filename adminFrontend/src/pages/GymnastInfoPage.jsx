import React, { useState, useEffect } from "react";
import NavigationBar from "../components/NavigationBar";
import ConfigHeader from "../components/ConfigHeader";
import AddButton from "../components/AddButton";
import GroupHeaders from "../components/GroupHeaders"; 
import PageHeader from "../components/PageHeader";
import GroupTableRow from "../components/GroupTableRow";
import GymnastHeaders from "../components/GymnastHeaders"
import GymnastTableRow from "../components/GymnastTableRow";
import XIcon from "../components/XIcon";
import BarsIcon from "../components/BarsIcon";
import StartButton from "../components/StartButton";
import { useNavigate } from "react-router-dom";

const GymnastInfoPage = () => {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const navigate = useNavigate();
  const [timeslots, setTimeSlots] = useState(() => {
    const savedTimeSlots = localStorage.getItem("timeslots");
    return savedTimeSlots ? JSON.parse(savedTimeSlots) : [];
  });
  
  const [localGroups, setLocalGroups] = useState(() => {
    const savedGroups = localStorage.getItem("groups");
    const groups = savedGroups ? JSON.parse(savedGroups) : [];
    return groups.length === 0 ? [{ id: 1, timeslotId: null, selectedNumSessions: null }] : groups;
  });

  const [gymnasts, setGymnasts] = useState(() => {
    const savedGymnasts = localStorage.getItem("gymnasts");
    const gymnasts = savedGymnasts ? JSON.parse(savedGymnasts).map(gymnast => ({
      ...gymnast,
      level: Number(gymnast.level),
      gsa_id: Number(gymnast.gsa_id),
    })) : [];
    return gymnasts.length === 0
      ? [{
          id: 1,
          gsa_id: null,
          first_name: "",
          last_name: "",
          club: "",
          district: "",
          level: null,
          date_of_birth: null,
          age: "",
          group_id: null,
        }]
      : gymnasts;
  });

  useEffect(() => {
    if (localGroups.length > 0) {
      localStorage.setItem("groups", JSON.stringify(localGroups));
    }
  }, [localGroups]);

  useEffect(() => {
    // Save gymnasts to local storage every time gymnasts state changes
    if (gymnasts.length > 0) {
      localStorage.setItem("gymnasts", JSON.stringify(gymnasts));
    }
  }, [gymnasts]);

  const handleAddGroup = () => {
    const newId = localGroups.length > 0 
      ? Math.max(...localGroups.map(g => g.id)) + 1 
      : 1;
    
    const newGroup = { id: newId, timeslotId: null };
    setLocalGroups(prevGroups => [...prevGroups, newGroup]);
  };

  const handleContinue = () => {
    navigate("/judgeInfo")
  };

  const handleAddGymnast = () => {
    const newId = gymnasts.length > 0 
      ? Math.max(...gymnasts.map(g => g.id)) + 1 
      : 1;

    const newGymnast = { 
      id: newId,
      gsa_id: null,
      first_name: "",
      last_name: "",
      club: "",
      district: "",
      level: null,
      date_of_birth: null,
      age: "",
      group_id: null
    };
    setGymnasts(prevGymnasts => [...prevGymnasts, newGymnast]);
  };

  const handleUpdateGymnast = (id, updatedFields) => {
    const updatedGymnasts = gymnasts.map(gymnast =>
      gymnast.id === id ? { ...gymnast, ...updatedFields } : gymnast
    );
    setGymnasts(updatedGymnasts);
  };

  const handleUpdateGroup = (id, updatedFields) => {
    const updatedGroups = localGroups.map(group =>
      group.id === id ? { ...group, ...updatedFields } : group
    );
    setLocalGroups(updatedGroups);
  };

  const handleRemoveGroup = (id) => {
    let updatedGroups = localGroups.filter(group => group.id !== id);
    if (updatedGroups.length === 0) {
      updatedGroups = [{ id: 1, timeslotId: null, selectedNumSessions: null }];
    } else {
      updatedGroups = updatedGroups.map((group, index) => ({ ...group, id: index + 1 }));
    }
    setLocalGroups(updatedGroups);
  };

  const handleRemoveGymnast = (id) => {
    let updatedGymnasts = gymnasts.filter(gymnast => gymnast.id !== id);
    if (updatedGymnasts.length === 0) {
      updatedGymnasts = [{
        id: 1,
        gsa_id: null,
        first_name: "",
        last_name: "",
        club: "",
        district: "",
        level: null,
        date_of_birth: null,
        age: "",
        group_id: null,
      }];
    } else {
      updatedGymnasts = updatedGymnasts.map((gymnast, index) => ({ ...gymnast, id: index + 1 }));
    }
    setGymnasts(updatedGymnasts);
  };

  const getTimeslotDetails = (timeslotId) => {
    return timeslots.find(ts => ts.id === timeslotId);
  };

  const getGroupDetails = (groupId) => {
    return localGroups.find(g => g.id === groupId);
  };

  return (
    <div className={`flex w-full left-0 h-screen bg-bright-white`}>
      {isNavVisible && <NavigationBar />}
      
      <div className={`flex-1 mb-20 bg-bright-white p-5`} style={{ marginLeft: isNavVisible ? '18%' : '0', width: isNavVisible ? 'calc(100% - 18%)' : '100%' }}>
        <BarsIcon onClick={() => setIsNavVisible(!isNavVisible)}/>
        <div className={`w-full ml-20 ${isNavVisible ? 'max-w-[1300px]' : 'max-w-[1600px]'} mx-auto gap-10`}>
          <PageHeader title="Gymnast Info Configuration" />

          <div className="flex flex-col gap-10">
          <div className="flex flex-col items-start">
              <ConfigHeader text="Gymnast Groups" />
          </div>

          <div className="flex flex-col items-center">

              <div className={`flex flex-col items-center justify-center gap-4 bg-white p-5 rounded-lg ${isNavVisible ? 'w-full' : 'w-[80%]'}`}>

                <div className="w-full ml-4 flex items-center justify-center flex-row gap-4">
                  <div className="w-full flex flex-col gap-2">
                    {localGroups.map((group, index) => {
                        const timeslot = getTimeslotDetails(group.timeslotId);
                        const timeslotValid = Boolean(timeslot); 
                        return (
                          <GroupTableRow
                            key={group.id}
                            ID={group.id}
                            TimeSlotID={group.timeslotId}
                            date={timeslot?.date || ''}
                            reportTime={timeslot?.reportTime || ''}
                            compTime={timeslot?.compTime || ''}
                            awardTime={timeslot?.awardTime || ''}
                            numSessions={timeslot?.numSessions || ''}
                            selectedNumSessions={group.selectedNumSessions}
                            onUpdate={(updatedFields) => handleUpdateGroup(group.id, updatedFields)}
                            error={!timeslotValid}
                            showTitle={index===0}
                          />
                        );
                      })}
                  </div>
                  <div className="flex flex-col items-start">
                    {localGroups.map((group, index) => (
                      <div className={`flex justify-end ${index === 0 ? 'pt-[60px] pb-[75px]' : 'py-[23px]'}`} key={group.id}>
                        <XIcon className="cursor-pointer" onClick={() => handleRemoveGroup(group.id)} isVisible={index !== 0} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-center py-5">
                <AddButton title="+" onClick={handleAddGroup} />
              </div>
          </div>
          </div>

          <div className="flex flex-col gap-10">
            <ConfigHeader text="Gymnasts" />


            <div className={`flex flex-col bg-white p-5 rounded-lg gap-4 `}>
              
              <div className="flex flex-row gap-4">

                <div className="w-[97%] flex flex-col gap-2">
                  {gymnasts.map((gymnast, index) => {
                    const group = getGroupDetails(gymnast.group_id);
                    const groupValid = Boolean(group); 
                      return (
                        <GymnastTableRow
                          key={gymnast.id}
                          ID={gymnast.id}
                          GSAId={gymnast.gsa_id}
                          f_name={gymnast.first_name}
                          l_name={gymnast.last_name}
                          club={gymnast.club}
                          district={gymnast.district}
                          level={gymnast.level}
                          dateOfBirth={gymnast.date_of_birth}
                          ageGroup={gymnast.age}
                          gymnastGroup={gymnast.group_id}
                          onUpdate={(updatedFields) => handleUpdateGymnast(gymnast.id, updatedFields)}
                          groupError={!groupValid}
                          showTitle={index===0}
                        />
                      );
                    })}
                </div>

                {/* XIcons for each group */}
                <div className="flex flex-col items-start">
                  {gymnasts.map((gymnast, index) => (
                    <div className={`flex justify-end ${index === 0 ? 'pt-[88px] pb-[55px]' : 'py-[23px]'}`} key={gymnast.id}>
                      <XIcon className="cursor-pointer" onClick={() => handleRemoveGymnast(gymnast.id)} isVisible={index !== 0} />
                    </div>
                  ))}
                </div>

              </div>
            </div>
            <div className="flex justify-center py-5">
              <AddButton title="+" onClick={handleAddGymnast} />
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

export default GymnastInfoPage;
