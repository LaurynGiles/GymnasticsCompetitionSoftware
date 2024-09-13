import React, { useState, useEffect } from "react";
import BlueButton from "../components/BlueButton";
import InputBox from "../components/InputBox";
import SmallLogo from "../components/SmallLogo";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../utils/api.js";
import { useNotifications } from "../utils/connection.jsx";

const LoginAdmin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { setAdminInfo, socket } = useNotifications();

  // useEffect(() => {
    // localStorage.clear();
    // localStorage.setItem("layout", 0);
  // }, []);

  const handleLogin = async () => {
    try {
      console.log('Login Admin Called');
      console.log(`${username}, ${password}`);
      const response = await loginAdmin(username, password);

      if (response.success) {
        const { admin_id, username, first_name, last_name, contact_number, email } = response.data;
        setAdminInfo({ admin_id, username, first_name, last_name, contact_number, email });

        console.log(admin_id);
        console.log(username);
        console.log(first_name);
        console.log(last_name);
        console.log(contact_number);
        console.log(email);

        console.log("Sending login message to socket");

        socket.emit('adminLogin', { admin_id, username}, (socketResponse) => {
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

    // if (username == "admin" && password == "1234") {
    //   navigate('/homejudges');
    // } else {
    //   setErrorMessage('Incorrect username or password');
    // }
  };

  return (
    <div className="bg-glaucous flex flex-col items-center w-full h-screen">
      <div className="w-full h-[40%] flex">
        <SmallLogo />
      </div>
      <div className="flex-grow flex items-center justify-center w-full h-[100%]">
          <div className="flex flex-col items-center bg-glaucous w-full px-4 gap-10">
            <div className="flex flex-col items-center gap-8">
              {errorMessage && (
                <div className="text-red-500 text-center w-full">{errorMessage}</div>
              )}
              <InputBox number={username} setNumber={setUsername} hasError={!!errorMessage} title={"Username"}/>
              <InputBox number={password} setNumber={setPassword} hasError={!!errorMessage} title={"Password"}/>
            </div>
              <BlueButton title="Login" onClick={handleLogin}/>
          </div>
      </div>
    </div>
  );
};

export default LoginAdmin;