import React from "react";
import SmallTableHeader from "../components/SmallTableHeader";
import LargeTableHeader from "../components/LargeTableHeader";

const TimeSlotHeaders = () => {
  return (
    <div className="flex items-center justify-center gap-10 px-0 py-2.5">
      <SmallTableHeader text={"ID"}/>
      <LargeTableHeader text={"Date"}/>
      <SmallTableHeader text={"Report Time"} />
      <SmallTableHeader text={"Comp Time"} />
      <SmallTableHeader text={"Awards Time"} />
    </div>
  );
};

export default TimeSlotHeaders;