import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import BlueButton from "../components/BlueButton";
import NavigationBarDefault from "../components/NavigationBarDefault";
import Header from "../components/Header";
import GymnastBlock from "../components/GymnastBlock";
import BlockHeader from "../components/BlockHeader";

const GymnastSelectHeadJudges = () => {
  const [selectedGymnast, setSelectedGymnast] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const gymnastBlocks = [
    { number: "56", name: "Travis Giles", level: "3", age: "07-08", club: "Stellenbosch gymnastics" },
    { number: "58", name: "Daniel Smith", level: "3", age: "07-08", club: "ACS" },
    { number: "64", name: "Jack Henderson", level: "3", age: "07-08", club: "Eversdal" },
    { number: "45", name: "Joshua Scott", level: "3", age: "07-08", club: "ACS" },
    { number: "26", name: "Kade Johnson", level: "3", age: "07-08", club: "Stellenbosch gymnastics" },
  ];

  const handleSelectGymnast = (index) => {
    setSelectedGymnast(index);
  };

  const selectedGymnastData = selectedGymnast !== null ? gymnastBlocks[selectedGymnast] : null;

  const handleConfirmClick = () => {
    localStorage.setItem("level", (selectedGymnastData.level));
    localStorage.setItem("age", (selectedGymnastData.age));
    localStorage.setItem("number", (selectedGymnastData.number));
    localStorage.setItem("name", (selectedGymnastData.name));
  
    navigate("/calculationsjudges");
  };

  return (
    <div className="bg-[#feffff] flex flex-row justify-center w-full h-screen">
      <div className="bg-bright-white w-full h-full">
        <div className="fixed top-0 w-full z-10">
          <NavigationBarDefault showBackIcon={false} showBookIcon={true} />
        </div>
        <div className="inline-flex flex-col w-full h-full items-center overflow-y-auto pt-[75px] pb-[60px] gap-[40px] relative">
          
          <div className="inline-flex flex-col items-center gap-[15px] px-0 py-[6px] relative flex-[0_0_auto]">
            <BlockHeader text={"District MAG Trials Levels 1-3"}/>
          <Header text={"Select the next gymnast"}/>
          {gymnastBlocks.map((gymnast, index) => (
              <GymnastBlock
                key={index}
                index={index}
                number={gymnast.number}
                name={gymnast.name}
                level={gymnast.level}
                age={gymnast.age}
                club={gymnast.club}
                isSelected={selectedGymnast === index}
                onSelect={handleSelectGymnast}
              />
            ))}
          </div>
          {error && <div className="text-red-500 font-montserrat">{error}</div>}
          <div onClick={handleConfirmClick}>
            <BlueButton title="Confirm" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GymnastSelectHeadJudges;