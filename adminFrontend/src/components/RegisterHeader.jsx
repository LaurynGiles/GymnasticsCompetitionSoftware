import PropTypes from "prop-types";
import React from "react";

const RegisterHeader = ({ text }) => {
  return (
    <div className="relative w-[40%] h-14 bg-light-periwinkle shadow-md rounded-lg p-4">
      <div className="absolute inset-0 flex items-center justify-center text-center">
        <span className="text-xl md:text-2xl lg:text-3xl font-medium text-prussian-blue font-montserrat leading-normal">
          {text}
        </span>
      </div>
    </div>
  );
};

RegisterHeader.propTypes = {
  text: PropTypes.string,
};


export default RegisterHeader;