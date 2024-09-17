import React, { useState, useEffect } from "react";
import NavigationBar from "../components/NavigationBar";
import ConfigHeader from "../components/ConfigHeader";
import AddButton from "../components/AddButton";
import GroupHeaders from "../components/GroupHeaders"; 
import PageHeader from "../components/PageHeader";
import GroupTableRow from "../components/GroupTableRow";
import { useNotifications } from "../utils/connection";

const GymnastInfoPage = () => {

  const [timeslots, setTimeSlots] = useState(() => {
    const savedTimeSlots = localStorage.getItem("timeslots");
    return savedTimeSlots ? JSON.parse(savedTimeSlots) : [];
  });
  
  const [localGroups, setLocalGroups] = useState(() => {
    const savedGroups = localStorage.getItem("groups");
    return savedGroups ? JSON.parse(savedGroups) : [];
  });

  useEffect(() => {
    localStorage.setItem("groups", JSON.stringify(localGroups));
  }, [localGroups]);

  const handleAddGroup = () => {
    // Ensure the groups array is not empty before calling Math.max
    const newId = localGroups.length > 0 
      ? Math.max(...localGroups.map(g => g.id)) + 1 
      : 1; // Start from 1 if no groups exist
    
    const newGroup = { id: newId, timeslotId: null };
    setLocalGroups(prevGroups => [...prevGroups, newGroup]);
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
    <div className="flex w-full h-screen bg-bright-white">
      <NavigationBar />
      <div className="flex-1 ml-72 mb-20 bg-bright-white overflow-auto p-5">
        <div className="w-full max-w-7xl mx-auto gap-10">
          <PageHeader title="Gymnast Info Configuration" />
          <div className="flex flex-col gap-10">
            <ConfigHeader text="Gymnast Groups" />
            <div className="bg-white p-5 rounded-lg shadow-md w-full">
              <GroupHeaders />
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
            </div>
            <div className="flex justify-center py-5">
              <AddButton title="+" onClick={handleAddGroup} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GymnastInfoPage;
