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
    return savedTimeslots ? JSON.parse(savedTimeslots).map(slot => ({
      ...slot,
      date: slot.date ? new Date(slot.date) : null
    })) : [];
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
    setLocalTimeslots(updatedTimeslots);
    // Also remove from local storage if needed
    if (updatedTimeslots.length === 0) {
      localStorage.removeItem("timeslots");
    } else {
      localStorage.setItem("timeslots", JSON.stringify(updatedTimeslots));
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
            <ConfigHeader text="Sessions" />
            <div className="bg-white p-5 rounded-lg shadow-md w-full">
              <div className="flex flex-col items-start justify-start">
                {/* Table Headers */}
                <TimeSlotHeaders />
                {/* Table Rows */}
                <div className="rounded-lg">
                  <div className="flex flex-row gap-4">
                    <div className="w-full">
                      {localTimeslots.map((slot) => (
                        <TimeSlotTableRow
                          key={slot.id}
                          ID={slot.id}
                          reportTime={slot.reportTime}
                          compTime={slot.compTime}
                          awardTime={slot.awardTime}
                          date={slot.date}
                          onUpdate={(updatedFields) => handleUpdateTimeSlot(slot.id, updatedFields)}
                        />
                      ))}
                    </div>

                    {/* XIcons for each timeslot */}
                    <div className="flex flex-col items-start">
                      {localTimeslots.map((slot) => (
                        <div className="flex justify-end py-6" key={slot.id}>
                          <XIcon className="cursor-pointer" onClick={() => handleRemoveTimeSlot(slot.id)} />
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
    
    