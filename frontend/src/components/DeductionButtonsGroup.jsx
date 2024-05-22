import React from "react";
import LargeButton from "./LargeButton";

const DeductionButtonsGroup = () => {
  return (
    <div className="flex-col inline-flex items-center justify-center gap-[20px] relative flex-[0_0_auto]">
      <LargeButton value={0.1}/>
      <LargeButton value={0.3}/>
      <LargeButton value={0.5}/>
      <LargeButton value={1.0}/>
    </div>
  );
};

export default DeductionButtonsGroup;