import React from "react";
import SmallTableHeader from "../components/SmallTableHeader";
import LargeTableHeader from "../components/LargeTableHeader";
import TinyTableHeader from "./TinyTableHeader";

const GroupHeaders = () => {
  return (
    <div className="flex items-start py-2.5">
      <SmallTableHeader text={"Group ID"}/>
      <TinyTableHeader text={"TimeSlot ID"} />
      <LargeTableHeader text={"Date"}/>
      <SmallTableHeader text={"Report Time"} />
      <SmallTableHeader text={"Comp Time"} />
      <SmallTableHeader text={"Awards Time"} />
    </div>
  );
};

export default GroupHeaders;