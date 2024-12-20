import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    // Check if judgeInfo exists in local storage
    const storedJudgeInfo = JSON.parse(localStorage.getItem("judgeInfo"));
    if (storedJudgeInfo && storedJudgeInfo.judge_id) {
      // Emit logout message to the server with judge_id
      socket.emit("logout", { judge_id: storedJudgeInfo.judge_id });
      console.log(`Judge ${storedJudgeInfo.judge_id} logged out.`);

      // Remove judgeInfo from local storage
      localStorage.removeItem("judgeInfo");
    }
  }, [socket]);
  
  const handleLogin = async () => {
    try {
      const response = await loginJudge(number);
      if (response.success) {
        console.log(response.data.judge)
        console.log(response.data);

        const {
          judge_id,
          competition_id,
          gsa_id,
          club,
          contact_number,
          createdAt,
          email,
          first_name: judge_fname,  // Renaming first_name to judge_fname
          gender,
          head_judge,
          last_name: judge_lname,    // Renaming last_name to judge_lname
          level,
          role,
          updatedAt
        } = response.data.judge;

        const judgeInfo = {
          judge_id,
          competition_id,
          gsa_id,
          club,
          contact_number,
          createdAt,
          email,
          judge_fname,  // Using renamed variable
          gender,
          head_judge,
          judge_lname,  // Using renamed variable
          level,
          role,
          updatedAt
        };

        // Set judge info in state and save it to local storage
        setJudgeInfo(judgeInfo);

        localStorage.setItem("judgeInfo", JSON.stringify(judgeInfo));
        localStorage.removeItem("homeJudgesState");

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
    <div className="bg-glaucous flex flex-col items-center w-full h-screen">
      <div className="w-full h-[40%] flex"> {/* Top padding for logo */}
        <SmallLogo />
      </div>
      <div className="flex-grow flex items-center justify-center w-full h-[100%]">
          <div className="flex flex-col items-center bg-glaucous w-full px-4 gap-10">
            <div className="flex flex-col items-center gap-8">
              {errorMessage && (
                <div className="text-red-500 text-center w-full">{errorMessage}</div>
              )}
              <InputBox number={number} setNumber={setNumber} hasError={!!errorMessage} />
            </div>
              <BlueButton title="Login" onClick={handleLogin}/>
          </div>
      </div>
    </div>
  );
};

export default LoginJudges;