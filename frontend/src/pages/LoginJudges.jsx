import React, { useState } from "react";
import BlueButton from "../components/BlueButton";
import InputBox from "../components/InputBox";
import SmallLogo from "../components/SmallLogo";
import { useNavigate } from "react-router-dom";
import { loginJudge } from "../utils/api.js";
import { useNotifications } from "../utils/connection.jsx";

const LoginJudges = () => {
  const [number, setNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { setJudgeInfo, socket } = useNotifications();

  const handleLogin = async () => {
    try {
      const response = await loginJudge(number);
      if (response.success) {
        const { judge_id, role, head_judge, judge_fname, judge_lname } = response.data;
        setJudgeInfo({ judge_id, role, head_judge, judge_fname, judge_lname });

        console.log(judge_id);
        console.log(role);
        console.log(head_judge);
        console.log(judge_fname);
        console.log(judge_lname);

        console.log("Sending login message to socket");

        socket.emit('login', { judge_id, judge_fname, judge_lname }, (socketResponse) => {
          if (socketResponse.success) {
            console.log("Socket joined successfully");
            navigate('/homejudges');
          } else {
            console.log("Socket bad error");
            setErrorMessage(socketResponse.message);
          }
        });

      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage('Authentication error');
    }
  };

  return (
    <div className="bg-glaucous flex justify-center w-full h-screen">
      <div className="bg-glaucous overflow-hidden w-full h-full">
        <div className="relative w-[446px] h-[769px] top-[-162px] left-[-23px]">
          <SmallLogo />
          <div className="inline-flex flex-col items-center gap-[30px] px-[50px] py-[70px] absolute top-[500px] left-[34px]">
            <div className="flex flex-col items-center w-[284px]">
              {errorMessage && (
                <div className="text-red-500 mb-2">{errorMessage}</div>
              )}
              <InputBox number={number} setNumber={setNumber} hasError={!!errorMessage} />
            </div>
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