import React from "react";
import Header from "../components/Header";
import NavigationBar from "../components/NavigationBar";
import TinyBlueButton from "../components/TinyBlueButton";
import { useNavigate } from "react-router-dom";

const CompletePage = () => {

  const navigate = useNavigate();

  const handleJudgeHome = () => {
    navigate("HomeAdmin");
  };

  return (
    <div className="flex h-screen bg-bright-white">
      <NavigationBar />
      <div className="flex-1 flex flex-col items-center justify-center px-4 lg:px-0 ml-64 gap-6 md:gap-16">
        <div className="w-full mx-auto flex flex-col items-center justify-center text-left">
          <div className="bg-notification-box p-5 rounded-lg shadow-lg max-w-5xl mx-auto">
            <p className="text-prussian-blue leading-relaxed">
              <span className="font-montserrat font-semibold text-lg md:text-xl lg:text-2xl">
                Competition Setup Complete!
              </span>
              <span className="font-montserrat font-medium text-md md:text-lg lg:text-xl">
                <br />
                You have successfully configured all required competition information.
                Your competition setup is now complete, and you are ready to create and start the competition.
                <br />
                <br />
              </span>
              <span className="font-montserrat font-semibold text-lg md:text-xl lg:text-2xl">
                What’s next?
                <br />
              </span>
              <span className="font-montserrat font-medium text-md md:text-lg lg:text-xl">
                Review the details you’ve entered to ensure all configurations are correct.
                Once verified, you can create the competition by clicking the "Create Competition" button below.
                <br />
                If you want to make further changes, feel free to revisit the configuration pages using the navigation bar.
                <br />
                <br />
              </span>
              <span className="font-montserrat font-semibold text-lg md:text-xl lg:text-2xl">
                Congratulations on completing the setup!
              </span>
              <span className="font-montserrat font-medium text-md md:text-lg lg:text-xl">
                <br />
                You’re now one step closer to a smooth and efficient competition experience.
                Thank you for using ScoreMatics to manage your event.
                <br />
                Click the button below to finalize your setup and officially create the competition.
              </span>
            </p>
          </div>
        </div>
        <TinyBlueButton title={"Create Competition"} onClick={handleJudgeHome} />
      </div>
    </div>
  );
};

export default CompletePage;
