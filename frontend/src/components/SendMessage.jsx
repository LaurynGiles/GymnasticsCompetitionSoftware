import React, {useState} from "react";
import SmallBlueButton from "./SmallBlueButton";
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
        <div className="inline-flex flex-col items-end justify-center gap-[15px] p-[10px] relative flex-[0_0_auto]">
          <div className="inline-flex items-end justify-center gap-[10px] px-[14px] py-[20px] relative flex-[0_0_auto] bg-anti-flash-white">
            <input
              type="text"
              value={message}
              onChange={handleInputChange}
              placeholder="Type your message here"
              className="w-[291px] p-2 font-montserrat font-normal text-prussian-blue text-[16px] tracking-[0] leading-[normal] border border-gray-300 rounded"
            />
          </div>
          <SmallBlueButton title={"Send"} onClick={handleSendClick} />
        </div>
      );
  };    

export default SendMessage;


