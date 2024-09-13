import React from "react";
import Header from "../components/Header";
import NavigationBar from "../components/NavigationBar";

const WelcomePage = () => {
  return (
    <div className="bg-bright-white w-full h-screen flex flex-col">
      <NavigationBar className="" />
       <div className="flex-1 flex flex-col items-center justify-center relative px-4 lg:px-0">
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center">
          <div className="bg-notification-box p-5 rounded-lg shadow-lg max-w-4xl mx-auto">
          <p className="text-prussian-blue text-lg md:text-xl lg:text-2xl leading-relaxed">
              <span className="font-semibold">
                Welcome to the ScoreMatics admin page!
                <br />
              </span>
              <span className="[font-family:'Montserrat-Medium',Helvetica] font-medium">
                <br />
                We welcome you as the administrator of this competition. To ensure smooth and efficient competition
                management, we&#39;ve designed a user-friendly interface that simplifies the process of uploading
                competition information.
                <br />
                <br />
              </span>
              <span className="font-semibold">
                Getting started:
                <br />
              </span>
              <span className="[font-family:'Montserrat-Medium',Helvetica] font-medium">
                Upload all required competition details, including the competition details, program, participants, and
                judges, are uploaded to their respective tabs.
                <br />
                For your convenience, we have provide Excel spreadsheet files that you can download and use to import
                competition information easily.
                <br />
                <br />
              </span>
              <span className="font-semibold">How to use the Excel spreadsheets</span>
              <span className="[font-family:'Montserrat-Medium',Helvetica] font-medium">
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
      </div>
    </div>
  );
};

export default WelcomePage;