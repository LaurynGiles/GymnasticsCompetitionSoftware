import React from "react";
import DownloadIcon from "./DownloadIcon";

const RegisterLink = ({ onClick }) => {
  return (
    <div
      className="flex items-end gap-2 pb-2 hover:cursor-pointer"
      onClick={onClick}
    >
      <span className="text-base font-medium font-montserrat text-xl md:text-2xl hover:text-white underline">
        Register
      </span>
    </div>
  );
};

export default RegisterLink;