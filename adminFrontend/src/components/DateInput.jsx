import PropTypes from "prop-types";
import React, { useState } from "react";
import CalendarIcon from "../components/CalendarIcon";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateInput = ({ date, setDate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (dateSelected) => {
    setDate(dateSelected);
    setIsOpen(false); // Optionally close the date picker after selecting a date
  };

  // Ensure date is a Date object before calling toLocaleDateString
  const formattedDate = date instanceof Date ? date.toLocaleDateString() : "";

  return (
    <div className="relative w-[300px]">
      <div className="flex  bg-bright-white items-center bg-anti-flash-white rounded-lg shadow-sm">
        <input
          type="text"
          value={formattedDate}
          readOnly
          className="w-full bg-transparent font-montserrat font-medium text-center text-prussian-blue text-2xl leading-normal outline-none"
          onClick={() => setIsOpen(!isOpen)}
        />
        <button onClick={() => setIsOpen(!isOpen)} aria-label="Open calendar">
          <CalendarIcon />
        </button>
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          <DatePicker
            selected={date}
            onChange={handleDateChange}
            inline
          />
        </div>
      )}
    </div>
  );
};

DateInput.propTypes = {
  date: PropTypes.instanceOf(Date),
  setDate: PropTypes.func.isRequired,
};

export default DateInput;
