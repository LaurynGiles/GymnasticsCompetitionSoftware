import PropTypes from "prop-types";
import React from "react";
import SmallTableBlock from "./SmallTableBlock";
import LargeTableBlock from "./LargeTableBlock";

const GroupTableData = ({ groupId , sessionLabel, date, reportTime, compTime, awardTime, isFirstRow }) => {

  return (
      <div className="flex shadow-md justify-start bg-anti-flash-white gap-6 p-2">
        {/* Conditional rendering based on ID */}
        {isFirstRow ? (
          <>
            <SmallTableBlock text={groupId.toString()} title={"Group ID"} />
            {/* <SmallTableBlock text={sessionId.toString()} title={"Session ID"} /> */}
            <SmallTableBlock text={sessionLabel} title={"Competition (by timeslot)"} />
            <LargeTableBlock text={date} title={"Date"} />
            <LargeTableBlock text={reportTime} title={"Report Time"} />
            <LargeTableBlock text={compTime} title={"Competition Time"} />
            <LargeTableBlock text={awardTime} title={"Award Time"} />
          </>
        ) : (
          <>
            <SmallTableBlock text={groupId.toString()}/>
            {/* <SmallTableBlock text={sessionId.toString()} /> */}
            <SmallTableBlock text={sessionLabel} />
            <LargeTableBlock text={date} />
            <LargeTableBlock text={reportTime} />
            <LargeTableBlock text={compTime} />
            <LargeTableBlock text={awardTime} />
          </>
        )}
      </div>
  );
};

GroupTableData.propTypes = {
    groupId: PropTypes.number.isRequired,
    sessionId: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    reportTime: PropTypes.string.isRequired,
    compTime: PropTypes.string.isRequired,
    awardTime: PropTypes.string.isRequired,
};
  

export default GroupTableData;