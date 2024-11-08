import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import HomeBlockHeader from "../components/HomeBlockHeader";
import { useNotifications } from "../utils/connection.jsx";
import { useNavigate } from "react-router-dom";
import Popup from "../components/Popup.jsx";
import QRBlockHeader from "../components/QRBlockHeader.jsx";
import BlueButton from "../components/BlueButton.jsx";

const QRCodePage = () => {

  const { adminInfo, socket } = useNotifications();
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");

  return (
      <div className="bg-bright-white w-full h-screen">
        <div className="flex flex-col items-center overflow-y-auto w-full pt-10 pb-10 gap-10">
          <QRBlockHeader text="QR Code Generation"/>
          
          <div className="w-full md:px-[20%] px-4 text-left">
              <Header text="Select a Competition"/>
          </div>

            {/* Display QR Code here */}
          

          <BlueButton title="Generate" />

        </div>
        {showError && <Popup message={error} onClose={() => setShowError(false)} />}
      </div>
  );
};

export default QRCodePage;