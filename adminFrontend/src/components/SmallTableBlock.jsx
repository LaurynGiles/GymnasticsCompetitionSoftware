import PropTypes from "prop-types";
import React from "react";

const SmallTableBlock = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center w-[200px] gap-2.5 relative">
      <div className="w-full py-2 px-4 font-montserrat font-medium text-prussian-blue text-base md:text-xl text-center">
        {text}
      </div>
    </div>
  );
};

SmallTableBlock.propTypes = {
  text: PropTypes.string,
};

export default SmallTableBlock;

