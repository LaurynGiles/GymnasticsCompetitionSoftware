import React from "react";
import Header from "../components/Header";
import NavigationBar from "../components/NavigationBar";
import StartButton from "../components/StartButton";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {

  const navigate = useNavigate();

  const handleJudgeHome = () => {
    navigate("/competitionConfig");
  };

  return (
    <div className="flex h-screen bg-bright-white">
      <NavigationBar />
      <div className="flex-1 flex flex-col items-center justify-center px-4 lg:px-0 ml-64 gap-6 md:gap-16">
        <div className="w-full mx-auto flex flex-col items-center justify-center text-left">
          <div className="bg-notification-box p-5 rounded-lg shadow-lg max-w-5xl mx-auto">
            <p className="text-prussian-blue leading-relaxed">
              <span className="font-montserrat font-semibold text-lg md:text-xl lg:text-2xl ">
                Welcome to the ScoreMatics admin page!
              </span>
              <span className="font-montserrat font-medium text-md md:text-lg lg:text-xl ">
                <br />
                We welcome you as the administrator of this competition. To ensure smooth and efficient competition
                management, we&#39;ve designed a user-friendly interface that simplifies the process of uploading
                competition information.
                <br />
                <br />
              </span>
              <span className="font-montserrat font-semibold text-lg md:text-xl lg:text-2xl">
                Getting started:
                <br />
              </span>
              <span className="font-montserrat font-medium text-md md:text-lg lg:text-xl">
                Upload all required competition details, including the competition details, program, participants, and
                judges, are uploaded to their respective tabs.
                <br />
                For your convenience, we have provide Excel spreadsheet files that you can download and use to import
                competition information easily.
                <br />
                <br />
              </span>
              <span className="font-montserrat font-semibold text-lg md:text-xl lg:text-2xl">How to use the Excel spreadsheets</span>
              <span className="font-montserrat font-medium text-md md:text-lg lg:text-xl">
                :<br />
                Download the provided Excel spreadsheet files from the page you are populating section.
                <br />
                Fill in the required competition data in the designated columns according to the provided format.
                <br />
                Once your data is ready, simply upload the Excel file using the “Upload” button on the page.
                <br />
                <br />
                Thank you for choosing Scorematics for your gymnastics competition management needs. Let&#39;s make your
                competitions even more spectacular together!
              </span>
            </p>
          </div>
        </div>
        <StartButton title={"Get Started"} onClick={handleJudgeHome}/>
      </div>
    </div>
  );
};

export default WelcomePage;