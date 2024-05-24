import React, {useState} from "react";

const ResubmitButton = ({ title, handleButtonClick }) => {

  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    if (!clicked) {
      setClicked(true);
      handleButtonClick();
    }
  };

  return (
    <button
      className={`all-[unset] box-border flex w-[200px] items-center justify-center gap-[10px] px-[10px] py-[5px] relative rounded-[20px] shadow-[0px_4px_4px_#00000040] ${
        clicked ? 'bg-notification-block cursor-not-allowed' : 'bg-prussian-blue hover:bg-prussian-blue-dark cursor-pointer'
      }`}
      onClick={handleClick}
      disabled={clicked}
    >
      <div className="relative w-fit mt-[1.00px] font-montserrat font-medium text-bright-white text-[22px] text-center tracking-[0] leading-[normal]">
        {title}
      </div>
    </button>
  );
};

export default ResubmitButton;