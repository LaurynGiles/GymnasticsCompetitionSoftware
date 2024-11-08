import React from "react";
import SmallTableHeader from "../components/SmallTableHeader";
import LargeTableHeader from "../components/LargeTableHeader";
import TinyTableHeader from "./TinyTableHeader";

const JudgeHeaders = () => {
  return (
    <div className="flex justify-center gap-2.5 py-2.5 pl-4 pr-12">
      <SmallTableHeader text={"Judge ID"}/>
      <TinyTableHeader text={"GSA ID"} />
      <LargeTableHeader text={"First Name"}/>
      <LargeTableHeader text={"Last Name"}/>
      <LargeTableHeader text={"Club"}/>
      <TinyTableHeader text={"Level"} />
      <TinyTableHeader text={"Head Judge"} />
      <TinyTableHeader text={"Role"} />
    </div>
  );
};

export default JudgeHeaders;