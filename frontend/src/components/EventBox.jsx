  import React, {useState} from "react";
  import TinyBlueButton from "./TinyBlueButton";
  import ArrowIcon from "./ArrowIcon";

  const EventBox = ({apparatus, levels, ages}) => {

    const [showPopup, setShowPopup] = useState(false);
    const [rotateArrow, setRotateArrow] = useState(180);
  
    const handleArrowClick = () => {
      setShowPopup(!showPopup);
      setRotateArrow(rotateArrow === 0 ? 180 : 0);
    };

    return (
      <div className="inline-flex flex-col items-center gap-[10px] px-[15px] py-[0px] relative bg-anti-flash-white rounded-[10px] overflow-hidden">
        <div className="flex w-[337px] items-center gap-[147px] px-[5px] py-[10px] relative flex-[0_0_auto]">
          <div className="relative w-[137.04px] h-[30px]">
            <div className="relative w-[135px] h-[30px] bg-periwinkle rounded-[10px]">
              <div className="absolute w-[100px] mt-[4.00px] h-7 top-px left-[18px] font-montserrat font-medium text-prussian-blue text-[18px] text-center tracking-[0] leading-[normal]">
                {apparatus}
              </div>
            </div>
          </div>
        </div>
        <div className="flex-col w-[337px] items-center pl-[15px] pr-[21px] py-[0px] relative flex-[0_0_auto]">
          <div className="flexwrap relative w-[297px] mt-[4.00px] font-montserrat font-medium text-prussian-blue text-base tracking-[0] leading-[normal]">
            Levels:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{levels.join(", ")}
          </div>
          <div className="flexwrap relative w-[297px] mt-[4.00px] font-montserrat font-medium text-prussian-blue text-base tracking-[0] leading-[normal]">
            Age groups:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ages.join(" yrs, ")} yrs
          </div>
        </div>
        <div className="flex w-[337px] items-center gap-[220px] pl-[15px] pr-[13px] py-1.5 relative flex-[0_0_auto]">
          <TinyBlueButton title={"Join"}/>
          <div onClick={handleArrowClick}>
            <ArrowIcon rotation={rotateArrow}/>
          </div>
        </div>
      </div>
    );
  };

  export default EventBox;