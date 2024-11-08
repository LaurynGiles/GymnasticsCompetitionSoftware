import React from "react";

const PageHeader = ({title}) => {
  return (
    <div className="flex items-center justify-center bg-light-periwinkle p-4 mb-6 rounded-lg shadow-md w-full">
        <h1 className="text-4xl font-montserrat font-medium text-prussian-blue text-center">
            {title}
        </h1>
    </div>
  );
};

export default PageHeader;
