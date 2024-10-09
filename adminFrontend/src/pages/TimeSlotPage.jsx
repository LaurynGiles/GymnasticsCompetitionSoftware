import React, { useState, useEffect } from "react";
import NavigationBar from "../components/NavigationBar";
import ConfigHeader from "../components/ConfigHeader";
import AddButton from "../components/AddButton";
import TimeSlotTableRow from "../components/TimeSlotTableRow.jsx";
import PageHeader from "../components/PageHeader";
import TimeSlotHeaders from "../components/TimeSlotHeaders";
import StartButton from "../components/StartButton.jsx";
import { useNavigate } from "react-router-dom";
import BarsIcon from "../components/BarsIcon.jsx";
import XIcon from "../components/XIcon.jsx";

const TimeSlotPage = () => {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const navigate = useNavigate();

  const [localTimeslots, setLocalTimeslots] = useState(() => {
    const savedTimeslots = localStorage.getItem("timeslots");
    const timeslots = savedTimeslots ? JSON.parse(savedTimeslots).map(slot => ({
      ...slot,
      date: slot.date ? new Date(slot.date) : null
    })) : [];

    if (timeslots.length === 0) {
      return [{ id: 1, date: null, reportTime: null, compTime: null, awardTime: null, numSessions: null }];
    }
    return timeslots;
  });

  useEffect(() => {
    // Save timeslots to local storage whenever they change
    localStorage.setItem("timeslots", JSON.stringify(localTimeslots));
  }, [localTimeslots]);

  const handleContinue = () => {
    navigate("/gymnastInfo")
  };
  
  const handleAddTimeSlot = () => {
    // Find the highest ID in the current timeslots
    const maxId = localTimeslots.reduce((max, slot) => Math.max(max, slot.id), 0);
    const newId = maxId + 1; // Increment to get the new ID

    const newTimeslot = {
      id: newId,
      date: null,
      reportTime: null,
      compTime: null,
      awardTime: null,
      numSessions: null
    };

    const updatedTimeslots = [...localTimeslots, newTimeslot];
    setLocalTimeslots(updatedTimeslots);
  };

  const handleUpdateTimeSlot = (id, updatedFields) => {
    const updatedTimeslots = localTimeslots.map((slot) =>
      slot.id === id ? { ...slot, ...updatedFields } : slot
    );
    setLocalTimeslots(updatedTimeslots);
  };

  const handleRemoveTimeSlot = (id) => {
    const updatedTimeslots = localTimeslots.filter(slot => slot.id !== id);

    if (updatedTimeslots.length === 0) {
      setLocalTimeslots([{ id: 1, date: null, reportTime: null, compTime: null, awardTime: null, numSessions: null }]);
    } else {
      // Reassign IDs to ensure continuity
      const reassignedTimeslots = updatedTimeslots.map((slot, index) => ({
        ...slot,
        id: index + 1 // Set IDs starting from 1 and incrementing by 1
      }));
      setLocalTimeslots(reassignedTimeslots);
    }
  };

  return (
    <div className="flex w-full h-screen bg-bright-white">
      {isNavVisible && <NavigationBar />}
      <div className="flex-1 mb-20 bg-bright-white p-5" style={{ marginLeft: isNavVisible ? '18%' : '0', width: isNavVisible ? 'calc(100% - 18%)' : '100%' }}>
        <BarsIcon onClick={() => setIsNavVisible(!isNavVisible)} />
        <div className="w-full max-w-7xl mx-auto gap-10">
          {/* Header */}
          <PageHeader title="Time Slot Configuration" />

          {/* Sessions Configuration */}
          <div className="flex flex-col gap-8">
            <ConfigHeader text="Timeslots" />
            <div className="bg-white p-5 rounded-lg w-full">
              <div className="flex flex-col items-center justify-start">

                {/* Table Rows */}
                <div className="w-full rounded-lg">
                  <div className="flex flex-row gap-10">
                    <div className="w-full flex flex-col gap-2">
                      {localTimeslots.map((slot) => (
                        <TimeSlotTableRow
                          key={slot.id}
                          ID={slot.id}
                          reportTime={slot.reportTime}
                          compTime={slot.compTime}
                          awardTime={slot.awardTime}
                          date={slot.date}
                          numSessions={slot.numSessions}
                          onUpdate={(updatedFields) => handleUpdateTimeSlot(slot.id, updatedFields)}
                        />
                      ))}
                    </div>

                    <div className="flex flex-col items-start">
                      {localTimeslots.map(slot => (
                        <div
                          className={`flex justify-end ${slot.id === 1 ? 'pt-[91px] pb-[15px]' : 'py-[17px]'}`} 
                          key={slot.id}
                        >
                          <XIcon
                            className="cursor-pointer"
                            onClick={() => handleRemoveTimeSlot(slot.id)}
                            isVisible={slot.id !== 1}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Add Button */}
          <div className="flex justify-center py-5">
            <AddButton title="+" onClick={handleAddTimeSlot} />
          </div>
        </div>
        <div className="flex justify-center items-center p-5 bg-bright-white">
          <StartButton onClick={handleContinue} title={"Continue"} />
        </div>
      </div>
    </div>
  );
};

export default TimeSlotPage;
    
    