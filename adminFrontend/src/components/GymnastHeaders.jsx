import React from "react";
import SmallTableHeader from "../components/SmallTableHeader";
import LargeTableHeader from "../components/LargeTableHeader";
import TinyTableHeader from "./TinyTableHeader";
import XIcon from "./XIcon";

const GymnastHeaders = () => {
  return (
    <div className="flex justify-start py-2.5 px-2 w-[97%]">
      <SmallTableHeader text={"Gymnast Number"}/>
      <TinyTableHeader text={"GSA ID"} />
      <LargeTableHeader text={"First Name"}/>
      <LargeTableHeader text={"Last Name"}/>
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