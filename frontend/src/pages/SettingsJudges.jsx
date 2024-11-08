import React, {useState, useEffect} from "react";
import NavigationBarDefault from "../components/NavigationBarDefault";
import { useLocation } from "react-router-dom";
import RadioSelectIcon from "../components/RadioSelectIcon";
import Header from "../components/Header";
import UserInfo from "../components/UserInfo";
import FilledRadioSelectIcon from "../components/FilledRadioSelectIcon";
import SmallBlueButton from "../components/SmallBlueButton";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "../utils/connection.jsx";

export const SettingsJudges = () => {

  const location = useLocation();
  const prevPage = location.state?.currPage || "/homejudges";
  const [selectedOption, setSelectedOption] = useState(0);
  const navigate = useNavigate();
  const { socket, judgeInfo } = useNotifications();

  useEffect(() => {
    const storedLayout = localStorage.getItem("layout");
    if (storedLayout !== null) {
      setSelectedOption(Number(storedLayout));
    }

    const handleStorageChange = (e) => {
      if (e.key === "layout") {
        setSelectedOption(Number(e.newValue) || 0);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleSelectOption = (index) => {
    setSelectedOption(index);
    localStorage.setItem("layout", index);
  };

  const renderRadioIcon = (index) => {
    return selectedOption === index ? (
      <FilledRadioSelectIcon className="!relative !w-[24px] !h-[24px]" />
    ) : (
      <RadioSelectIcon className="!relative !w-[24px] !h-[24px]" />
    );
  };

  const renderHorizontalSection = () => (
    <div className="w-[50%] md:w-[40%] lg:w-[30%] flex flex-col items-center gap-4 bg-light-periwinkle p-4 rounded-xl">
      <div className="text-prussian-blue text-center text-xl font-medium">Horizontal</div>
      <div className="flex items-center gap-4 cursor-pointer" onClick={() => handleSelectOption(0)}>
        {renderRadioIcon(0)}
        <div className="text-prussian-blue text-lg">Top</div>
      </div>
    </div>
  );
  
  const renderVerticalSection = () => (
    <div className="w-[50%] md:w-[40%] lg:w-[30%] flex flex-col items-center gap-4 bg-light-periwinkle p-4 rounded-xl">
      <div className="text-prussian-blue text-center text-xl font-medium">Vertical</div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => handleSelectOption(1)}>
          {renderRadioIcon(1)}
          <div className="text-prussian-blue text-lg">Left-handed</div>
        </div>
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => handleSelectOption(2)}>
          {renderRadioIcon(2)}
          <div className="text-prussian-blue text-lg">Right-handed</div>
        </div>
      </div>
    </div>
  );
  
  const renderConditionalLayoutV = () => {
    if (selectedOption === 2) {
      return (
        <div className="flex items-center justify-center gap-4">
          <div className="w-10 h-5 bg-glaucous" />
          <div className="flex flex-col items-center gap-1">
            <div className="w-4 h-4 bg-glaucous" />
            <div className="w-4 h-4 bg-glaucous" />
            <div className="w-4 h-4 bg-glaucous" />
            <div className="w-4 h-4 bg-glaucous" />
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex items-center justify-center gap-4">
          <div className="flex flex-col items-center gap-1">
            <div className="w-4 h-4 bg-glaucous" />
            <div className="w-4 h-4 bg-glaucous" />
            <div className="w-4 h-4 bg-glaucous" />
            <div className="w-4 h-4 bg-glaucous" />
          </div>
          <div className="w-10 h-5 bg-glaucous" />
        </div>
      );
    }
  };
  
  const renderLayoutSettings = () => (
    <div className="w-full flex flex-col items-center justif-center gap-8">
      <div className="w-full flex flex-row items-center justify-center gap-16">
        {renderHorizontalSection()}
        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-2">
            <div className="w-4 h-4 bg-glaucous rounded-sm" />
            <div className="w-4 h-4 bg-glaucous rounded-sm" />
          </div>
          <div className="flex gap-2">
            <div className="w-4 h-4 bg-glaucous rounded-sm" />
            <div className="w-4 h-4 bg-glaucous rounded-sm" />
          </div>
          <div className="w-10 h-5 bg-glaucous rounded-sm" />
        </div>
        
      </div>
      <div className="w-full flex flex-row items-center justify-center gap-10">
        {renderVerticalSection()}
        {renderConditionalLayoutV()}
      </div>
    </div>
  );
  
  const handleLogout = async () => {
    socket.emit('logout', { judge_id: judgeInfo.judge_id });
    navigate('/login');
  };
  
  return (
    <div className="bg-bright-white flex flex-row justify-center w-full">
      <div className="bg-bright-white w-full h-full">
        <div className="fixed top-0 left-0 w-full z-10">
          <NavigationBarDefault showBackIcon={true} showBookIcon={false} prevPage={prevPage}/>
        </div>
        <div className="w-full pt-[75px] pb-[50px] px-4 md:px-8 h-full overflow-y-auto">
          <div className="w-full flex flex-col items-center gap-8">
            <Header text={"User information"} />
            <UserInfo number={"548657"} name={`${judgeInfo.judge_fname} ${judgeInfo.judge_lname}`} email={"deb@gmail.com"} license={"Category A"} />
            <Header text={"Layout Settings"} />
            {renderLayoutSettings()}
            <Header text={"Logout"} />
            <SmallBlueButton title={"Logout"} onClick={handleLogout} />
          </div>
        </div>
      </div>
    </div>
  );
  };

export default SettingsJudges