import React from "react";
import SmallTableHeader from "../components/SmallTableHeader";
import LargeTableHeader from "../components/LargeTableHeader";
import TinyTableHeader from "./TinyTableHeader";

const GymnastHeaders = () => {
  return (
    <div className="flex justify-center gap-2 py-2.5 mx-2">
      <SmallTableHeader text={"Gymnast Number"}/>
      <TinyTableHeader text={"GSA ID"} />
      <LargeTableHeader text={"Name"}/>
      <LargeTableHeader text={"Club"}/>
      <SmallTableHeader text={"District"} />
      <TinyTableHeader text={"Level"} />
      <LargeTableHeader text={"Date of Birth"}/>
      <SmallTableHeader text={"Age group"} />
      <TinyTableHeader text={"Gymnast Group"} />
    </div>
  );
};

export default GymnastHeaders;