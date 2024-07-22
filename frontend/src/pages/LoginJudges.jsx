import React, { useState } from "react";
import BlueButton from "../components/BlueButton";
import InputBox from "../components/InputBox";
import SmallLogo from "../components/SmallLogo";
import { useNavigate } from "react-router-dom";
import { loginJudge } from "../utils/api.js";

const LoginJudges = () => {
  const [number, setNumber] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await loginJudge(number);
      if (response.success) {
        const { judge_id, role, head_judge } = response.data;
        console.log(judge_id);
        console.log(role);
        console.log(head_judge);
        localStorage.setItem('userRole', role);
        localStorage.setItem('headJudge', head_judge);
        localStorage.setItem('judgeId', judge_id);
        navigate('/homejudges');
      } else {
        alert(response.message);
      }
    } catch (error) {
      alert('Invalid GSA number');
    }
  };

  return (
    <div className="bg-glaucous flex justify-center w-full h-screen">
      <div className="bg-glaucous overflow-hidden w-full h-full">
        <div className="relative w-[446px] h-[769px] top-[-162px] left-[-23px]">
          <SmallLogo />
          <div className="inline-flex flex-col items-center gap-[20px] px-[50px] py-[70px] absolute top-[500px] left-[34px]">
            <InputBox number={number} setNumber={setNumber} />
            <div onClick={handleLogin}>
              <BlueButton title="Login" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginJudges;