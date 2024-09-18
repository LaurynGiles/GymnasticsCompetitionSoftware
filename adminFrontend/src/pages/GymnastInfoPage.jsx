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

const GymnastInfoPage = () => {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [timeslots, setTimeSlots] = useState(() => {
    const savedTimeSlots = localStorage.getItem("timeslots");
    return savedTimeSlots ? JSON.parse(savedTimeSlots) : [];
  });
  
  const [localGroups, setLocalGroups] = useState(() => {
    const savedGroups = localStorage.getItem("groups");
    return savedGroups ? JSON.parse(savedGroups) : [];
  });

  const [gymnasts, setGymnasts] = useState(() => {
    const savedGymnasts = localStorage.getItem("gymnasts");
    return savedGymnasts ? JSON.parse(savedGymnasts).map(gymnast => ({
      ...gymnast,
      level : Number(gymnast.level),
      GSAId: Number(gymnast.GSAId), // Ensure GSAId is a number
    })) : [];
  });

  useEffect(() => {
    if (localGroups.length > 0) {
      localStorage.setItem("groups", JSON.stringify(localGroups));
    }
  }, [localGroups]);

  useEffect(() => {
    // Filter out gymnasts that don't have the required fields
    const validGymnasts = gymnasts.filter(gymnast => 
      gymnast.GSAId && gymnast.name && gymnast.club && gymnast.district &&
      gymnast.level && gymnast.dateOfBirth && gymnast.ageGroup
    );
  
    if (validGymnasts.length > 0) {
      console.log("Saving valid gymnasts to local storage:", validGymnasts);
      localStorage.setItem("gymnasts", JSON.stringify(validGymnasts));
    }
  }, [gymnasts]);

  const handleAddGroup = () => {
    const newId = localGroups.length > 0 
      ? Math.max(...localGroups.map(g => g.id)) + 1 
      : 1;
    
    const newGroup = { id: newId, timeslotId: null };
    setLocalGroups(prevGroups => [...prevGroups, newGroup]);
  };

  const handleAddGymnast = () => {
    const newId = gymnasts.length > 0 
      ? Math.max(...gymnasts.map(g => g.id)) + 1 
      : 1;

    const newGymnast = { 
      id: newId,
      GSAId: null,
      name: "",
      club: "",
      district: "",
      level: null,
      dateOfBirth: null,
      ageGroup: "",
      gymnastGroup: null
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

  const getTimeslotDetails = (timeslotId) => {
    return timeslots.find(ts => ts.id === timeslotId);
  };

  return (
    <div className={`flex w-full left-0 h-screen bg-bright-white`}>
      {isNavVisible && <NavigationBar />}
      {/* <button onClick={() => setIsNavVisible(!isNavVisible)} className="p-2 bg-blue-500 text-white rounded">
        {isNavVisible ? "Hide Navigation" : "Show Navigation"}
      </button> */}
      
      <div className={`flex-1 mb-20 bg-bright-white p-5`} style={{ marginLeft: isNavVisible ? '18%' : '0', width: isNavVisible ? 'calc(100% - 18%)' : '100%' }}>
        <BarsIcon onClick={() => setIsNavVisible(!isNavVisible)}/>
        <div className={`w-full ml-20 ${isNavVisible ? 'max-w-[1300px]' : 'max-w-[1600px]'} mx-auto gap-10`}>
          <PageHeader title="Gymnast Info Configuration" />

          <div className="flex flex-col gap-10">
            <ConfigHeader text="Gymnast Groups" />
            
            <div className={`flex flex-col gap-4 bg-white p-5 rounded-lg shadow-md ${isNavVisible ? 'w-full' : 'w-[80%]'}`}>
              <GroupHeaders />
              <div className="flex flex-row gap-4">
                <div className="bg-anti-flash-white rounded-lg">
                  {localGroups.map(group => {
                      const timeslot = getTimeslotDetails(group.timeslotId);
                      const timeslotValid = Boolean(timeslot); // Check if the timeslot is valid
                      return (
                          <GroupTableRow
                            key={group.id}
                            ID={group.id}
                            TimeSlotID={group.timeslotId}
                            date={timeslot?.date || ''}
                            reportTime={timeslot?.reportTime || ''}
                            compTime={timeslot?.compTime || ''}
                            awardTime={timeslot?.awardTime || ''}
                            onUpdate={(updatedFields) => handleUpdateGroup(group.id, updatedFields)}
                            error={!timeslotValid}
                          />
                      );
                    })}
                </div>
                {/* XIcons for each group */}
                <div className="flex flex-col justify-start mt-3 gap-8">
                  {localGroups.map(group => (
                    <div className="flex justify-end" key={group.id}>
                      <XIcon className="cursor-pointer" onClick={() => handleRemoveGroup(group.id)} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-center py-5">
              <AddButton title="+" onClick={handleAddGroup} />
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <ConfigHeader text="Gymnasts" />


            <div className={`flex flex-col gap-4 bg-white p-5 rounded-lg shadow-md`}>
              <GymnastHeaders />
              <div className="flex flex-row gap-4">
                <div className="bg-anti-flash-white rounded-lg w-full">
                  {gymnasts.map(gymnast => {
                      return (
                        <GymnastTableRow
                          key={gymnast.id}
                          ID={gymnast.id}
                          GSAId={gymnast.GSAId}
                          name={gymnast.name}
                          club={gymnast.club}
                          district={gymnast.district}
                          level={gymnast.level}
                          dateOfBirth={gymnast.dateOfBirth}
                          ageGroup={gymnast.ageGroup}
                          gymnastGroup={gymnast.gymnastGroup}
                          onUpdate={(updatedFields) => handleUpdateGymnast(gymnast.id, updatedFields)}
                        />
                      );
                    })}
                </div>

                {/* XIcons for each group */}
                <div className="flex flex-col justify-start mt-3 gap-8">
                  {gymnasts.map(gymnast => (
                    <div className="flex justify-end" key={gymnast.id}>
                      <XIcon className="cursor-pointer" onClick={() => handleRemoveGroup(gymnast.id)} />
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
      </div>
    </div>
  );
};

export default GymnastInfoPage;
