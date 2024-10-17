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
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import Papa from 'papaparse'; 
import UploadLink from "../components/UploadLink";
import DownloadLink from "../components/DownloadLink";

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

    // Function to generate Excel template for timeslots
  const generateTimeslotTemplate = () => {
    const worksheetData = [
      ['Date', 'Report Time', 'Competition Time', 'Award Time', 'Num Sessions (1-3)'], // Headers
      ['2024-10-20', '08:00:00', '09:00:00', '12:00:00', '1'], // Example row
      ['YYYY-MM-DD', 'HH:MM:SS', 'HH:MM:SS', 'HH:MM:SS', '1'], // Sample/placeholder data
    ];

    // Create the worksheet and workbook
    const ws = XLSX.utils.aoa_to_sheet(worksheetData);

    // Format columns as Date and Time for Excel
    ws['A1'].z = 'yyyy-mm-dd';  // Date format
    ws['B1'].z = 'hh:mm:ss';    // Time format for report time
    ws['C1'].z = 'hh:mm:ss';    // Time format for competition time
    ws['D1'].z = 'hh:mm:ss';    // Time format for award time

    // Create workbook and append the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Timeslots");

    // Export the workbook as an Excel file
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, "Timeslot_Template.xlsx");
  };

  // Function to handle file upload for timeslots
const handleTimeslotUpload = (e) => {
  console.log('Uploading timeslots');
  const file = e.target.files[0];

  if (!file) {
    console.error("No file selected");
    return;
  }

  Papa.parse(file, {
    complete: (results) => {
      const parsedData = results.data;

      setLocalTimeslots(prevTimeslots => {
        // Find the highest existing ID in the current timeslot list
        const highestId = prevTimeslots.length > 0 
          ? Math.max(...prevTimeslots.map(timeslot => timeslot.id)) 
          : 0;

        // Filter out empty rows
        const filteredData = parsedData.slice(1).filter(row => {
          return row.some(value => value !== null && value.trim() !== '');
        });

        // Map CSV rows to timeslot data, adding a unique ID for each timeslot
        const timeslotsFromCSV = filteredData.map((row, index) => {
          const numSessions = Number(row[4]); // Convert numSessions to number
          
          // Validate numSessions (must be between 1 and 3, otherwise set to null)
          const validNumSessions = numSessions >= 1 && numSessions <= 3 ? numSessions : null;

          const parsedDate = row[0] ? new Date(row[0]) : null;
          const validDate = parsedDate instanceof Date && !isNaN(parsedDate.getTime()) ? parsedDate : null;

          return {
            id: highestId + index + 1, // Generate a new ID based on the current highest ID
            date: validDate,  // Date as string (YYYY-MM-DD)
            reportTime: row[1],  // Report time (HH:MM:SS)
            compTime: row[2],    // Competition time (HH:MM:SS)
            awardTime: row[3],   // Award time (HH:MM:SS)
            numSessions: validNumSessions  // Validated numSessions value
          };
        });

        // Return the updated timeslot list with the new CSV data appended
        return [...prevTimeslots, ...timeslotsFromCSV];
      });
    },
    header: false,
  });

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

            <div className="flex flex-row items-end justify-start gap-10">
              <ConfigHeader text="Timeslots" />
              <DownloadLink onClick={generateTimeslotTemplate} />
              <UploadLink onFileChange={handleTimeslotUpload} fileInputId="timeslotFileInput" /> {/* Unique ID for groups */}
            </div>


            <div className="bg-white p-5 rounded-lg w-full">
              <div className="flex flex-col items-center justify-start">

                {/* Table Rows */}
                <div className="w-full rounded-lg">
                  <div className="flex flex-row gap-4">
                    <div className="w-full flex flex-col gap-2">
                      {localTimeslots.map((slot, index) => (
                        <TimeSlotTableRow
                          key={slot.id}
                          ID={slot.id}
                          reportTime={slot.reportTime}
                          compTime={slot.compTime}
                          awardTime={slot.awardTime}
                          date={slot.date}
                          numSessions={slot.numSessions}
                          onUpdate={(updatedFields) => handleUpdateTimeSlot(slot.id, updatedFields)}
                          showTitle={index===0}
                        />
                      ))}
                    </div>

                    <div className="flex flex-col items-start">
                      {localTimeslots.map((slot, index) => (
                        <div
                          className={`flex justify-end ${index === 0 ? 'pt-[91px] pb-[19px]' : 'py-[21px]'}`} 
                          key={slot.id}
                        >
                          <XIcon
                            className="cursor-pointer"
                            onClick={() => handleRemoveTimeSlot(slot.id)}
                            isVisible={index !== 0}
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
        {/* <div className="flex justify-center items-center p-5 bg-bright-white">
          <StartButton onClick={handleContinue} title={"Continue"} />
        </div> */}
      </div>
    </div>
  );
};

export default TimeSlotPage;
    
    