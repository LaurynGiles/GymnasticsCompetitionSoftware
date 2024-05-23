import React from "react";

const InputBox = ({number, setNumber}) => {

  const handleChange = (e) => {
    setNumber(e.target.value);
  };

    return (
      <div className="flex w-[284px] items-center gap-[10px] pl-[10px] pr-[130px] py-[10px] flex-[0_0_auto] relative bg-bright-white rounded-[20px]">
        <input
          type="text"
          value={number}
          onChange={handleChange}
          placeholder="GSA number"
          className="w-full bg-transparent font-montserrat font-medium text-prussian-blue text-[22px] tracking-[0] leading-[normal] outline-none"
        />
      </div>
    );
  };

export default InputBox;