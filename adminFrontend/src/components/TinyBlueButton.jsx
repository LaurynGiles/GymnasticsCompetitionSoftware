import React from "react";
import { useNotifications } from "../utils/connection.jsx";

const TinyBlueButton = ({ title, onClick }) => {
    return (
      <button
        className={`box-border flex items-center justify-center gap-2 px-4 md:px-5 lg:px-6 py-2 md:py-3 lg:py-4 rounded-3xl shadow-md bg-prussian-blue cursor-pointer text-bright-white text-sm md:text-md lg:text-lg`}
        onClick={onClick}
      >
        <div className="font-montserrat font-medium text-center">
          {title}
        </div>
      </button>
    );
  };

export default TinyBlueButton;