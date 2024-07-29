import React, {useState, useEffect} from "react";
import NavigationBarDefault from "../components/NavigationBarDefault";
import { useLocation } from "react-router-dom";
import RadioSelectIcon from "../components/RadioSelectIcon";
import Header from "../components/Header";
import UserInfo from "../components/UserInfo";
import FilledRadioSelectIcon from "../components/FilledRadioSelectIcon";
import BlueButton from "../components/BlueButton";
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

  const renderConditionalLayoutV = () => {
    if (selectedOption === 2) {
      return (
        <div className="inline-flex items-center justify-center gap-[10px] relative flex-[0_0_auto]">
          <div className="w-[40px] h-[21px] relative bg-glaucous" />
                <div className="inline-flex flex-col items-center justify-center gap-[5px] relative flex-[0_0_auto]">
                  <div className="w-[15px] h-[15px] relative bg-glaucous" />
                  <div className="w-[15px] h-[15px] relative bg-glaucous" />
                  <div className="w-[15px] h-[15px] relative bg-glaucous" />
                  <div className="w-[15px] h-[15px] relative bg-glaucous" />
                </div>
        </div>
      );
    } else {
      return (
        <div className="inline-flex items-center justify-center gap-[10px] relative flex-[0_0_auto]">
                <div className="inline-flex flex-col items-center justify-center gap-[5px] relative flex-[0_0_auto]">
                  <div className="w-[15px] h-[15px] relative bg-glaucous" />
                  <div className="w-[15px] h-[15px] relative bg-glaucous" />
                  <div className="w-[15px] h-[15px] relative bg-glaucous" />
                  <div className="w-[15px] h-[15px] relative bg-glaucous" />
                </div>
                <div className="w-[40px] h-[21px] relative bg-glaucous" />
        </div>
      );
    }
  };

  const handleLogout = async () => {
    socket.emit('logout', { judge_id: judgeInfo.judge_id });
    navigate('/login');
  };


  return (
    <div className="bg-[#feffff] flex flex-row justify-center w-full h-screen">
      <div className="bg-bright-white w-[400px] h-[800px]">
        <div className="fixed top-0 w-[400px] z-10">
          <NavigationBarDefault showBackIcon={true} showBookIcon={false} prevPage={prevPage}/>
        </div>
        <div className="inline-flex w-full h-full flex-col items-center gap-[30px] overflow-y-auto pt-[75px] pb-[50px] relative">
          <Header text={"User information"} />
          <UserInfo number={"548657"} name={"Debbie Giles"} email={"deb@gmail.com"} license={"Category A"} />
          <Header text={"Layout Settings"} />
          <div className="items-center justify-center gap-[54px] inline-flex relative flex-[0_0_auto]">
            <div className="flex-col items-start gap-[25px] inline-flex relative flex-[0_0_auto]">
              <div className="flex w-[210px] gap-[9px] px-[20px] py-[20px] bg-light-periwinkle rounded-[20px] overflow-hidden flex-col items-center relative flex-[0_0_auto]">
                <div className="relative w-[118px] h-[27px] mt-[-1.00px] font-montserrat font-medium text-prussian-blue text-[22px] text-center tracking-[0] leading-[normal]">
                  Horizontal
                </div>
                <div className="flex-col items-start gap-[9px] ml-[-1.00px] mr-[-1.00px] inline-flex relative flex-[0_0_auto]">
                  <div className="flex w-[190px] cursor-pointer items-center gap-[14px] px-[5px] py-0 relative flex-[0_0_auto]" onClick={() => handleSelectOption(0)}>
                  {renderRadioIcon(0)}
                    <div className="relative w-[85px] h-[27px] mt-[3.00px] font-montserrat font-medium text-prussian-blue text-[20px] tracking-[0] leading-[normal]">
                      Top
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-[210px] gap-[9px] px-[20px] py-[20px] bg-light-periwinkle rounded-[20px] overflow-hidden flex-col items-center relative flex-[0_0_auto]">
                <div className="relative w-[118px] h-[27px] mt-[-1.00px] font-montserrat font-medium text-prussian-blue text-[22px] text-center tracking-[0] leading-[normal]">
                  Vertical
                </div>
                <div className="flex flex-col w-[190px] items-start gap-[9px] relative flex-[0_0_auto] ml-[-1.00px] mr-[-1.00px]">
                  <div className="flex w-[190px] cursor-pointer items-center gap-[14px] px-[5px] py-0 relative flex-[0_0_auto]" onClick={() => handleSelectOption(1)}>
                    {renderRadioIcon(1)}
                    <div className="relative w-[145px] h-[27px] mt-[3.00px] mr-[-3.00px] font-montserrat font-medium text-prussian-blue text-[20px] tracking-[0] leading-[normal]">
                      Left-handed
                    </div>
                  </div>
                  <div className="flex w-[190px] cursor-pointer items-center gap-[14px] px-[5px] py-0 relative flex-[0_0_auto]" onClick={() => handleSelectOption(2)}>
                    {renderRadioIcon(2)}
                    <div className="relative w-[145px] h-[27px] mt-[3.00px] mr-[-3.00px] font-montserrat font-medium text-prussian-blue text-[20px] tracking-[0] leading-[normal]">
                      Right-handed
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-col items-start gap-[86px] inline-flex relative flex-[0_0_auto]">
            <div className="inline-flex justify-center gap-[10px] flex-col items-center relative flex-[0_0_auto]">
          <div className="inline-flex flex-col items-center justify-center gap-[5px] relative flex-[0_0_auto]">
            <div className="inline-flex items-center justify-center gap-[5px] relative flex-[0_0_auto]">
              <div className="w-[15px] h-[15px] relative bg-glaucous" />
              <div className="w-[15px] h-[15px] relative bg-glaucous" />
            </div>
            <div className="inline-flex items-center justify-center gap-[5px] relative flex-[0_0_auto]">
              <div className="w-[15px] h-[15px] relative bg-glaucous" />
              <div className="w-[15px] h-[15px] relative bg-glaucous" />
            </div>
          </div>
          <div className="w-[40px] h-[21px] relative bg-glaucous" />
            </div>
            {renderConditionalLayoutV()}
            </div>
          </div>
          <Header text={"Logout"} />
          <div onClick={handleLogout}>
            <BlueButton title={"Logout"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsJudges