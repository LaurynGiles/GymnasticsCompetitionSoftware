import React, { useState, useEffect } from "react";
import NavigationBar from "../components/NavigationBar";
import ConfigHeader from "../components/ConfigHeader";
import InputLabel from "../components/InputLabel";
import AddButton from "../components/AddButton";
import TimeSlotTableRow from "../components/TimeSlotTableRow.jsx";
import PageHeader from "../components/PageHeader";
import TimeSlotHeaders from "../components/TimeSlotHeaders";
import { useNotifications } from "../utils/connection.jsx";

const TimeSlotPage = () => {

  const { timeslots, setTimeSlots } = useNotifications();

  const [localTimeslots, setLocalTimeslots] = useState(() => {
    const savedTimeslots = localStorage.getItem("timeslots");
    return savedTimeslots ? JSON.parse(savedTimeslots).map(slot => ({
      ...slot,
      date: slot.date ? new Date(slot.date) : null
    })) : timeslots;
  });
  useEffect(() => {
    // Save timeslots to local storage whenever they change
    localStorage.setItem("timeslots", JSON.stringify(localTimeslots));
    setTimeSlots(localTimeslots); // Update global state if needed
  }, [localTimeslots, setTimeSlots]);
  
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
    setTimeSlots(updatedTimeslots); // Update global state if needed
  };

  const handleUpdateTimeSlot = (id, updatedFields) => {
    const updatedTimeslots = localTimeslots.map((slot) =>
      slot.id === id ? { ...slot, ...updatedFields } : slot
    );
    setLocalTimeslots(updatedTimeslots);
    setTimeSlots(updatedTimeslots); // Update global state if needed
  };

  return (
    <div className="flex w-full h-screen bg-bright-white">
      <NavigationBar />
      <div className="flex-1 ml-72 mb-20 bg-bright-white overflow-auto p-5">
        <div className="w-full max-w-7xl mx-auto gap-10">
          {/* Header */}
          <PageHeader title="Time Slot Configuration" />

          {/* Sessions Configuration */}
          <div className="flex flex-col gap-10">
            <ConfigHeader text="Sessions" />
            <div className="bg-white p-5 rounded-lg shadow-md w-full">
              <div className="flex flex-col items-center justify-start">
                {/* Table Headers */}
                <TimeSlotHeaders />
                {/* Table Rows */}
                <div className="bg-anti-flash-white rounded-lg">
                  {timeslots.map((slot) => (
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

                
              </div>
            </div>
          </div>
          {/* Add Button */}
          <div className="flex justify-center py-5">
            <AddButton title="+" onClick={handleAddTimeSlot} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSlotPage;
    
    