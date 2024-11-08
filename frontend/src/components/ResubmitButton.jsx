import React, {useState, useEffect} from "react";

const ResubmitButton = ({ title, handleButtonClick }) => {

  const [clicked, setClicked] = useState(() => {
    return JSON.parse(localStorage.getItem('resubmitButtonClicked')) || false;
  });

  useEffect(() => {
    // Save the 'clicked' state to local storage whenever it changes
    localStorage.setItem('resubmitButtonClicked', JSON.stringify(clicked));
  }, [clicked]);

  const handleClick = () => {
    if (!clicked) {
      setClicked(true);
      handleButtonClick();
    }
  };

  return (
    <button
      className={`all-[unset] box-border flex w-[200px] items-center justify-center gap-[10px] px-[10px] py-[5px] relative rounded-[20px] shadow-[0px_4px_4px_#00000040] ${
        clicked ? 'bg-notification-box-system cursor-default' : 'bg-prussian-blue hover:bg-prussian-blue-dark cursor-pointer'
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