import React from "react";

const BlockHeader = ({ text }) => {
  return (
      <div className="w-[90%] px-4 py-2 md:py-4 bg-light-periwinkle rounded-lg">
          <p className="font-montserrat font-medium text-prussian-blue text-lg md:text-3xl text-center">
             {text}
          </p>
      </div>
  );
};
  
  export default BlockHeader;