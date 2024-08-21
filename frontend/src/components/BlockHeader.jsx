import React from "react";

const BlockHeader = ({ text }) => {
  return (
      <div className="w-[90%] px-4 py-2 md:py-4 bg-light-periwinkle rounded-lg">
          <p className="font-montserrat font-medium text-prussian-blue text-xl lg:text-3xl md:text-2xl text-center">
             {text}
          </p>
      </div>
  );
};
  
  export default BlockHeader;