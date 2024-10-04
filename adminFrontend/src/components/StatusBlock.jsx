import PropTypes from "prop-types";
import React from "react";

const StatusBlock = ({ text, status }) => {
  return (
    <div className={`w-full h-[50px] flex items-center justify-center font-montserrat font-medium text-base md:text-xl px-10 text-center ${status === 'complete' ? 'bg-blue-100 text-green-600' : 'bg-red-100 text-red-600'} border rounded-lg mb-2`}>
      <span>{text}:</span>
      <span className="ml-20">{status}</span> {/* Add margin left for spacing */}
    </div>
  );
};

StatusBlock.propTypes = {
  text: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default StatusBlock;