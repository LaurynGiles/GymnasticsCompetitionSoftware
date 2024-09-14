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

  return (
    <div className="relative">
      <div className="flex w-full max-w-[500px] items-center gap-2.5 px-2.5 py-1 bg-anti-flash-white rounded-lg shadow-sm">
        <input
          type="text"
          value={date ? date.toLocaleDateString() : ""}
          readOnly
          className="w-full bg-transparent font-montserrat font-medium text-prussian-blue text-2xl leading-normal outline-none"
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
