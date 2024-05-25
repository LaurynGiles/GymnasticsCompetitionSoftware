import React, {useState} from "react";
import NavigationBarDefault from "../components/NavigationBarDefault";
import BlockHeader from "../components/BlockHeader";
import Header from "../components/Header";
import LoginRequest from "../components/LoginRequest";
import StartButton from "../components/StartButton";
import RemoveRequest from "../components/RemoveRequest";
import { Link } from "react-router-dom";

const LobbyHeadJudges = () => {

  const [joinedList, setJoinedList] = useState([]);
  const [acceptList, setAcceptList] = useState(["Annette Nel", "Peter Weibel", "Lauryn Giles", "Debbie Giles"]);

  const addJoined = (name) => {
    setJoinedList([...joinedList, name]);
  };

  const removeJoined = (index) => {
    setJoinedList((prevValues) => {
      const newNames = prevValues.filter((_, i) => i !== index);
      return newNames;
    });
  }

  const removeAccept = (index) => {
    setAcceptList((prevValues) => {
      const newNames = prevValues.filter((_, i) => i !== index);
      return newNames;
    });
  }

  return (
    <div className="bg-[#feffff] flex flex-row justify-center w-full h-screen">
      <div className="bg-bright-white w-full h-full">
        <div className="fixed top-0 w-full z-10">
          <NavigationBarDefault showBackIcon={false} showBookIcon={true} />
        </div>
        <div className="inline-flex flex-col w-full h-full items-center overflow-y-auto pt-[75px] gap-[40px] relative">
          <BlockHeader text="District MAG Trials Levels 1-3"/>
          <div className="inline-flex flex-col items-center gap-[10px] relative flex-[0_0_auto] bg-bright-white">
            <Header text={"Accept join requests"}/>
            <div className="flex-col w-[344px] p-[10px] gap-[10px] bg-anti-flash-white flex items-center justify-center relative flex-[0_0_auto]">
              {acceptList.map((name, index) => (
                <LoginRequest key={index} name={name} removeAccept={removeAccept} addJoined={addJoined} index={index}/>
              ))}
            </div>
          </div>
          <div className="inline-flex flex-col items-center gap-[10px] relative flex-[0_0_auto] bg-bright-white">
            <Header text={"Judges at the table"}/>
            <div className="flex-col w-[344px] p-[10px] gap-[10px] bg-anti-flash-white flex items-center justify-center relative flex-[0_0_auto]">
              {joinedList.map((name, index) => (
                <RemoveRequest key={index} name={name} removeJoined={removeJoined} index={index}/>
              ))}
            </div>
          </div>
          <div className="inline-flex flex-col h-[245px] items-center justify-end gap-[10px] px-[20px] py-[50px] relative">
            <Link to="/gymnastselect">
              <StartButton/>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LobbyHeadJudges