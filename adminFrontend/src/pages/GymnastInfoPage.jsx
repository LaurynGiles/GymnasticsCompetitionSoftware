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
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import DownloadLink from "../components/DownloadLink";
import UploadLink from "../components/UploadLink";
import Papa from 'papaparse'; 

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
    
    const newGroup = { id: newId, timeslotId: null, selectedNumSessions: null };
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

  // Function to generate the Excel template
  const generateGymnastTemplate = () => {
    const worksheetData = [
      ['GSA ID', 'First Name', 'Last Name', 'Date of Birth', 'Club', 'District', 'Level', 'Age Group', 'Group ID'],
      ['123456', 'John', 'Doe', '2005-05-15', 'Club 1', 'District 2', '1', '7-8', '1'], // Sample row
      ['654321', 'Jane', 'Smith', '2006-06-20', 'Club 2', 'District 1', '2', '9-10', '1'], // Sample row
      ['', '', '', 'YYYY-MM-DD', '', '', '', '', ''] // Blank row
    ];

    // Create the worksheet and workbook
    const ws = XLSX.utils.aoa_to_sheet(worksheetData);

    // Apply text formatting to all cells except Date of Birth
    const range = XLSX.utils.decode_range(ws['!ref']);
    for (let C = range.s.c; C <= range.e.c; ++C) {
      for (let R = range.s.r; R <= range.e.r; ++R) {
        const cellAddress = XLSX.utils.encode_cell({c: C, r: R});
        if (!ws[cellAddress]) continue;

        // Apply Text format (use `@` for text formatting in Excel)
        if (C !== 3) { // Exclude "Date of Birth" column (index 3)
          ws[cellAddress].z = '@'; // Text format
        } else if (C === 3 && R > 0) { // Apply Date format to "Date of Birth" column
          ws[cellAddress].z = 'yyyy-mm-dd'; // Date format
        }
      }
    }

    // Create workbook and append the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Gymnasts");

    // Export the workbook as an Excel file
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "Gymnast_Template.xlsx");
  };

  const generateGroupTemplate = () => {
    const worksheetData = [
      ['Timeslot ID', 'Selected Num Sessions'],
      ['1', 'A'], // Sample row
      ['2', 'B'], // Sample row
      ['3', 'C'], // Sample row
    ];
  
    // Create the worksheet and workbook
    const ws = XLSX.utils.aoa_to_sheet(worksheetData);
  
    // Apply text formatting
    const range = XLSX.utils.decode_range(ws['!ref']);
    for (let C = range.s.c; C <= range.e.c; ++C) {
      for (let R = range.s.r; R <= range.e.r; ++R) {
        const cellAddress = XLSX.utils.encode_cell({c: C, r: R});
        if (!ws[cellAddress]) continue;
        ws[cellAddress].z = '@'; // Text format for all cells
      }
    }
  
    // Create workbook and append the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Groups");
  
    // Export the workbook as an Excel file
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "Group_Template.xlsx");
  };

// Function to handle file upload
const handleGymnastUpload = (e) => {
  console.log('Uploading gymnasts');

  const file = e.target.files[0];

  if (!file) {
    console.error("No file selected");
    return;
  }

  // Retrieve age groups from local storage
  const storedAgeGroups = JSON.parse(localStorage.getItem('ageGroups')) || [];
  
  // Create options in the format of "min-max yrs"
  const storedOptions = storedAgeGroups.map(group => `${group.minAge}-${group.maxAge} yrs`);

  Papa.parse(file, {
    complete: (results) => {
      const parsedData = results.data;

      setGymnasts(prevGymnasts => {
        // Find the highest existing ID in the current gymnast list
        const highestId = prevGymnasts.length > 0 
          ? Math.max(...prevGymnasts.map(gymnast => gymnast.id)) 
          : 0;

        // Filter out empty rows
        const filteredData = parsedData.slice(1).filter(row => row.some(cell => cell.trim() !== ''));

        // Map CSV rows to gymnast data, adding a unique ID for each gymnast
        const gymnastsFromCSV = filteredData.map((row, index) => {
          const ageGroup = `${row[7]} yrs`; // Age group read from the CSV
          console.log(ageGroup);
          
          // Check if the age group matches any stored options; set to null if not
          const validAgeGroup = storedOptions.includes(ageGroup) ? ageGroup : "";
          console.log(validAgeGroup);

          return {
            id: highestId + index + 1, // Generate a new ID based on the current highest ID
            gsa_id: row[0] ? Number(row[0]) : null, // Convert GSA ID to a number
            first_name: row[1],
            last_name: row[2],
            date_of_birth: row[3], // Ensure this is formatted as "YYYY-MM-DD"
            club: row[4],
            district: row[5],
            level: row[6] ? Number(row[6]) : null, // Convert level to a number
            age: validAgeGroup, // Validated age group or null
            group_id: row[8] ? Number(row[8]) : null, // Convert group_id to a number
          };
        });

        // Return the updated gymnast list with the new CSV data appended
        return [...prevGymnasts, ...gymnastsFromCSV];
      });
    },
    header: false,
  });
};

  const handleGroupUpload = (e) => {
    console.log('Uploading groups');
    const file = e.target.files[0];
  
    if (!file) {
      console.error("No file selected");
      return;
    }
  
    Papa.parse(file, {
      complete: (results) => {
        const parsedData = results.data;
  
        setLocalGroups(prevGroups => {
          // Find the highest existing ID in the current group list
          const highestId = prevGroups.length > 0 
            ? Math.max(...prevGroups.map(group => group.id)) 
            : 0;
  
          // Convert session letters ("A", "B", "C") to numbers (1, 2, 3)
          const convertSessionLetterToNumber = (letter) => {
            switch (letter) {
              case "A":
                return 1;
              case "B":
                return 2;
              case "C":
                return 3;
              default:
                return null; // If the letter is invalid or missing
            }
          };

          // Filter out any empty or invalid rows
          const filteredData = parsedData.slice(1).filter(row => row[0]?.trim() !== '' && row[1]?.trim() !== '');
  
          // Map CSV rows to group data, adding a unique ID for each group
          const groupsFromCSV = filteredData.slice(1).map((row, index) => {
            const timeslotId = row[0] ? Number(row[0]) : null; // Convert TimeslotID to a number
            const selectedNumSessions = convertSessionLetterToNumber(row[1]); // Convert session letter to number
  
            // Fetch timeslot details to validate session limits
            const timeslot = getTimeslotDetails(timeslotId);
  
            // Validate selectedNumSessions does not exceed numSessions for the timeslot
            const validSelectedNumSessions = (timeslot && selectedNumSessions > timeslot.numSessions) 
              ? null  // Set to null if it exceeds available sessions
              : selectedNumSessions;
  
            return {
              id: highestId + index + 1, // Generate a new ID based on the current highest ID
              timeslotId, // Timeslot ID
              selectedNumSessions: validSelectedNumSessions // Validated selectedNumSessions
            };
          });
  
          // Return the updated group list with the new CSV data appended
          return [...prevGroups, ...groupsFromCSV];
        });
      },
      header: false,
    });
  };
  


  return (
    <div className={`flex w-full left-0 h-screen bg-bright-white`}>
      {isNavVisible && <NavigationBar />}
      
      <div className={`flex-1 mb-20 bg-bright-white p-5`} style={{ marginLeft: isNavVisible ? '18%' : '0', width: isNavVisible ? 'calc(100% - 18%)' : '100%' }}>
        <BarsIcon onClick={() => setIsNavVisible(!isNavVisible)}/>
        <div className={`w-full mb-20 ml-20 ${isNavVisible ? 'max-w-[1300px]' : 'max-w-[1600px]'} mx-auto`}>
          <PageHeader title="Gymnast Info Configuration" />

          <div className="flex flex-col gap-10 mb-20">
            <div className="flex flex-row items-end justify-start gap-10">
              <ConfigHeader text="Gymnast Groups" />
              <DownloadLink onClick={generateGroupTemplate} />
              <UploadLink onFileChange={handleGroupUpload} fileInputId="groupFileInput" /> {/* Unique ID for groups */}
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

          <div className="flex flex-row items-end justify-start gap-10">
            <ConfigHeader text="Gymnasts" />
            <DownloadLink onClick={generateGymnastTemplate} />
            <UploadLink onFileChange={handleGymnastUpload} fileInputId="gymnastFileInput" /> {/* Unique ID for gymnasts */}
          </div>

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
        {/* <div className="flex justify-center items-center p-5 bg-bright-white">
          <StartButton onClick={handleContinue} title={"Continue"} />
        </div> */}
      </div>
    </div>
  );
};

export default GymnastInfoPage;
