import PropTypes from "prop-types";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SmallClockIcon from "./SmallClockIcon";

const TimeInput = ({ time, setTime }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleTimeChange = (date) => {
    if (date) {
      setTime(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <div className="flex w-full bg-bright-white items-center gap-2.5 bg-anti-flash-white rounded-lg shadow-sm">
        <input
          type="text"
          value={time || ""}
          readOnly
          className="w-full h-[50px] bg-transparent font-montserrat font-medium text-center text-prussian-blue text-xl leading-normal outline-none"
          placeholder="00:00"
          onClick={() => setIsOpen(!isOpen)}
        />
        <button onClick={() => setIsOpen(!isOpen)} aria-label="Open clock">
          <SmallClockIcon />
        </button>
      </div>
      {isOpen && (
        <div className="absolute w-[237px] bg-white border-2 border-glaucous rounded-lg shadow-xl z-10 mt-1">
        <DatePicker
          selected={time ? new Date(`1970-01-01T${time}:00`) : null}
          onChange={handleTimeChange}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="h:mm aa"
          className="p-2" // Add padding inside the DatePicker
        />
      </div>
      )}
    </div>
  );
};

TimeInput.propTypes = {
  time: PropTypes.string,
  setTime: PropTypes.func.isRequired,
};

export default TimeInput;
