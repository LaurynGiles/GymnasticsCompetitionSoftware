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
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import Papa from 'papaparse'; 
import UploadLink from "../components/UploadLink";
import DownloadLink from "../components/DownloadLink";

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
    })) : [{ id: 1, gsa_id: null, first_name: "", last_name: "", club: "", level: null, head_judge: false, role: "" }];

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

  // Function to generate the Excel template for judges
  const generateJudgeTemplate = () => {
    const worksheetData = [
      ['GSA ID', 'First Name', 'Last Name', 'Club', 'Level', 'Head Judge (true/false)', 'Role (E/D)'],
      ['12345', 'John', 'Jones', 'Club 1', '1', 'true', 'E'], // Sample row
      ['67890', 'Jane', 'Smith', 'Club 2', '2', 'false', 'D'], // Sample row
    ];

    // Create the worksheet and workbook
    const ws = XLSX.utils.aoa_to_sheet(worksheetData);

      // Set column widths
    ws['!cols'] = [
      { wch: 10 }, // GSA ID
      { wch: 15 }, // First Name
      { wch: 15 }, // Last Name
      { wch: 20 }, // Club
      { wch: 10 }, // Level
      { wch: 20 }, // Head Judge (true/false)
      { wch: 10 }, // Role (E/D)
    ];

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
    XLSX.utils.book_append_sheet(wb, ws, "Judges");

    // Export the workbook as an Excel file
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "Judge_Template.xlsx");
  };

  // Function to handle file upload for judges
const handleJudgeUpload = (e) => {
  console.log('Uploading judges');
  const file = e.target.files[0];

  if (!file) {
    console.error("No file selected");
    return;
  }

  Papa.parse(file, {
    complete: (results) => {
      const parsedData = results.data;

      setJudges(prevJudges => {
        // Find the highest existing ID in the current judge list
        const highestId = prevJudges.length > 0 
          ? Math.max(...prevJudges.map(judge => judge.id)) 
          : 0;

        
        const filteredData = parsedData.slice(1).filter(row => {
          return row.some(value => value !== null && value.trim() !== '');
        });

        // Map CSV rows to judge data, adding a unique ID for each judge
        const judgesFromCSV = filteredData.map((row, index) => {
          // Validate role
          const validRole = ['E', 'D'].includes(row[6]) ? row[6] : ''; // Must be 'E' or 'D', else set to empty string

          // Validate head judge field (must be 'true' or 'false')
          const validHeadJudge = row[5] === 'true' ? true : row[5] === 'false' ? false : false;

          return {
            id: highestId + index + 1, // Generate a new ID based on the current highest ID
            gsa_id: row[0] ? Number(row[0]) : null, // Convert GSA ID to a number
            first_name: row[1],
            last_name: row[2],
            club: row[3],
            level: row[4] ? Number(row[4]) : null, // Convert level to a number
            head_judge: validHeadJudge, // Validated head_judge value
            role: validRole, // Validated role value
          };
        });

        // Filter out empty rows where all fields are blank
        const filteredJudges = judgesFromCSV.filter(judge => Object.values(judge).some(value => value !== null && value !== ''));

        // Return the updated judge list with the new CSV data appended
        return [...prevJudges, ...filteredJudges];
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
        <div className={`w-full ml-20 ${isNavVisible ? 'max-w-[1300px]' : 'max-w-[1600px]'} mx-auto gap-10`}>
          <PageHeader title="Judge Info Configuration" />

          <div className="flex flex-col gap-10">
          <div className="flex flex-row items-end justify-start gap-10">
              <ConfigHeader text="Judges" />
              <DownloadLink onClick={generateJudgeTemplate} />
              <UploadLink onFileChange={handleJudgeUpload} fileInputId="judgeFileInput" /> {/* Unique ID for groups */}
            </div>


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

        {/* <div className="flex justify-center items-center p-5 bg-bright-white">
          <StartButton onClick={handleContinue} title={"Continue"} />
        </div> */}
      </div>
    </div>
  );
};

export default JudgeInfoPage;
