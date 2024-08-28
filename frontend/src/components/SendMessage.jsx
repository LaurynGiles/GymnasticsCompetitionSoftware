import React, {useState} from "react";
import TinyBlueButton from "./TinyBlueButton";
import SmallBlueButton from "./SmallBlueButton.jsx"
import { useNotifications } from "../utils/connection.jsx"

const SendMessage = ({ setError, setShowError }) => {

    const [message, setMessage] = useState("");
    const { groupId, socket } = useNotifications();

    const handleInputChange = (event) => {
        setMessage(event.target.value);
    };


    const handleSendClick = () => {
      if (groupId) {
        socket.emit("headJudgeMessage", {groupId, message});
      } else {
        console.log("Setting error");
        setError("Please start a group before sending messages.");
        setShowError(true);
      }
        setMessage("");
    };
    return (
      <div className="w-[80%] md:w-[60%] lg:w-[50%] flex flex-col items-center justify-center gap-4 p-4 md:p-6 lg:p-8">
        <div className="flex w-full items-center justify-center gap-4 px-4 py-3 bg-anti-flash-white rounded-lg shadow-md">
          <textarea
            value={message}
            onChange={handleInputChange}
            placeholder="Type your message here"
            className="w-full p-2 font-montserrat font-normal text-prussian-blue text-base md:text-lg tracking-normal leading-normal border border-gray-300 rounded-md resize-none"
            rows="3"
          />
        </div>
        <TinyBlueButton title={"Send"} buttonClass={"bg-prussian-blue"} onClick={handleSendClick} />
      </div>
    );
  };    

export default SendMessage;


