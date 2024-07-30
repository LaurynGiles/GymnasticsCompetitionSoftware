import React, {useState, useEffect} from "react";
// import { useNotifications } from "../utils/connection.jsx";

const InfoBlock = () => {

    const [apparatus, setApparatus] = useState("");
    const [level, setLevel] = useState("");
    const [number, setNumber] = useState("");
    const [age, setAge] = useState("");
    const [name, setName] = useState("");
    const { nextGymnast, currApparatus} = useNotifications();

    // useEffect(() => {
    //     if (nextGymnast) {
    //         setApparatus(`${currApparatus} event`);
    //         setLevel(`- Level ${nextGymnast.level}`);
    //         setAge(`${nextGymnast.age} yrs`);
    //         setNumber(`(${nextGymnast.number})`);
    //         setName(`${nextGymnast.first_name} ${nextGymnast.last_name}`);
    //     }
    // }, [nextGymnast, currApparatus]);

  return (
<div className="flex flex-col w-[365.35px] items-center gap-[3px] px-[3px] py-[15px] relative flex-[0_0_auto] bg-light-periwinkle rounded-[10px]">
    <div className="flex w-[328px] items-center justify-center gap-[10px] relative flex-[0_0_auto]">
        <p className="relative w-[319px] mt-[0.00px] font-montserrat font-semibold text-prussian-blue text-[20px] text-center tracking-[0] leading-[normal]">
            {apparatus} {level}
        </p>
    </div>
    <div className="flex w-[328px] items-center justify-center gap-[10px] relative flex-[0_0_auto]">
        <div className="relative w-[319px] mt-[0.00px] font-montserrat font-medium text-prussian-blue text-[18px] text-center tracking-[0] leading-[normal]">
            {age}
        </div>
    </div>
    <div className="flex w-[328px] items-center justify-center gap-[10px] relative flex-[0_0_auto]">
        <div className="relative w-[319px] mt-[0.00px] font-montserrat font-medium text-prussian-blue text-[18px] text-center tracking-[0] leading-[normal]">
        {number} {name}
        </div>
    </div>
</div>
  );
};

export default InfoBlock;