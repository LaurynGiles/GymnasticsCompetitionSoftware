import React, { useState } from "react";
import BlueButton from "../components/BlueButton";
import InputBox from "../components/InputBox";
import SmallLogo from "../components/SmallLogo";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie';

const LoginJudges = () => {
  const [number, setNumber] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    try {
      const response = axios.post('/api/login', { gsa_id: number });
      if (response.data.message === 'Login successful') {
        const judgeInfo = JSON.parse(Cookies.get('judgeInfo'));
        localStorage.setItem('userRole', judgeInfo.role);
        localStorage.setItem('headJudge', judgeInfo.head_judge);
        navigate('/homejudges');
      }
    } catch (error) {
      alert("Invalid GSA number");
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