import PropTypes from "prop-types";
import React from "react";
import DateInput from "./DateInput";

const DateTableBlock = ({ date, setDate, title }) => {
  return (
    <div className="flex flex-col items-center justify-between w-[200px]">
      {/* Render title if provided */}
      {title && (
        <div className="font-montserrat font-medium text-prussian-blue text-base md:text-lg text-center mb-1">
          {title}
        </div>
      )}
      <DateInput date={date} setDate={setDate} />
    </div>
  );
};

DateTableBlock.propTypes = {
  date: PropTypes.instanceOf(Date),
  setDate: PropTypes.func.isRequired,
  title: PropTypes.string, // Title is optional
};

export default DateTableBlock;
