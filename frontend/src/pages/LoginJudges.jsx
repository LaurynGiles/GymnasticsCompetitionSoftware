import React, {useState} from "react";
import BlueButton from "../components/BlueButton";
import InputBox from "../components/InputBox";
import SmallLogo from "../components/SmallLogo";
import { Link } from "react-router-dom";

const LoginJudges = () => {
  const [number, setNumber] = useState("");


  return (
    <div className="bg-glaucous flex justify-center w-full h-screen">
      <div className="bg-glaucous overflow-hidden w-full h-full">
        <div className="relative w-[446px] h-[769px] top-[-162px] left-[-23px]">
          <SmallLogo/>
          <div className="inline-flex flex-col items-center gap-[20px] px-[50px] py-[70px] absolute top-[500px] left-[34px]">
            <InputBox number={number} setNumber={setNumber}/>
            <Link to="/home">
              <BlueButton title="Login"/>
            </ Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginJudges;