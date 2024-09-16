import PropTypes from "prop-types";
import React from "react";
import DateInput from "./DateInput";

const DateTableBlock = ({ date, setDate }) => {
  return (
    <div className="flex flex-col items-center justify-center w-[300px] py-2 px-4 relative">
      <DateInput date={date} setDate={setDate} />
    </div>
  );
};

DateTableBlock.propTypes = {
  date: PropTypes.instanceOf(Date),
  setDate: PropTypes.func.isRequired,
};

export default DateTableBlock;