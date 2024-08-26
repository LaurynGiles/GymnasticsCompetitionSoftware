import React, {useState, useEffect} from "react";
import { useNotifications } from "../utils/connection.jsx";

const InfoBlock = () => {

    const [apparatus, setApparatus] = useState("");
    const [level, setLevel] = useState("");
    const [number, setNumber] = useState("");
    const [age, setAge] = useState("");
    const [name, setName] = useState("");
    const { nextGymnast, currApparatus} = useNotifications();

    useEffect(() => {
        if (nextGymnast) {
            setApparatus(`${currApparatus} event`);
            setLevel(`- Level ${nextGymnast.level}`);
            setAge(`${nextGymnast.age} yrs`);
            setNumber(`(${nextGymnast.gymnast_id})`);
            setName(`${nextGymnast.first_name} ${nextGymnast.last_name}`);
        }
    }, [nextGymnast, currApparatus]);

    return (
        <div className="flex flex-col items-center gap-2 px-4 py-4 bg-light-periwinkle rounded-xl w-[90%] md:w-[80%] lg:w-[50%]">
          {/* Apparatus and Level */}
          <div className="flex w-full items-center justify-center">
            <p className="font-montserrat font-semibold text-prussian-blue text-lg md:text-xl lg:text-2xl text-center">
              {apparatus} {level}
            </p>
          </div>
      
          {/* Age */}
          <div className="flex w-full items-center justify-center">
            <div className="font-montserrat font-medium text-prussian-blue text-base md:text-lg lg:text-xl text-center">
              {age}
            </div>
          </div>
      
          {/* Number and Name */}
          <div className="flex w-full items-center justify-center">
            <div className="font-montserrat font-medium text-prussian-blue text-base md:text-lg lg:text-xl text-center">
              {number} {name}
            </div>
          </div>
        </div>
      );
};

export default InfoBlock;