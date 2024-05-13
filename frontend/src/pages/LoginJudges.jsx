import React from "react";
import BlueButton from "../components/BlueButton";
import InputBox from "../components/InputBox";
import SmallLogo from "../components/SmallLogo";

const LoginJudges = () => {
  return (
    <div className="bg-[#6279b8] flex flex-row justify-center w-full">
      <div className="bg-glaucous overflow-hidden w-[400px] h-[800px]">
        <div className="relative w-[446px] h-[769px] top-[-162px] left-[-23px]">
          <div className="inline-flex flex-col items-center gap-[20px] px-[50px] py-[70px] absolute top-[500px] left-[34px]">
            <InputBox/>
            <BlueButton/>
          </div>
          <SmallLogo/>
        </div>
      </div>
    </div>
  );
};

export default LoginJudges;