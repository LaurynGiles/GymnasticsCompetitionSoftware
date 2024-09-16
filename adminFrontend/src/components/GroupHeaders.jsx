import React from "react";
import SmallTableHeader from "../components/SmallTableHeader";
import LargeTableHeader from "../components/LargeTableHeader";

const GroupHeaders = () => {
  return (
    <div className="flex items-center justify-center py-2.5">
      <SmallTableHeader text={"Group Number"}/>
      <SmallTableHeader text={"TimeSlot ID"} />
      <LargeTableHeader text={"Date"}/>
      <SmallTableHeader text={"Report Time"} />
      <SmallTableHeader text={"Comp Time"} />
      <SmallTableHeader text={"Awards Time"} />
    </div>
  );
};

export default GroupHeaders;