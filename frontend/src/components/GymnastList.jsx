import React from "react";

const GymnastList = ({ allOptions }) => {

    return (
        <div className="absolute top-[100%] mt-2 w-[337px] bg-white border border-gray-300 rounded-lg shadow-lg z-10">
            <ul className="flex flex-col">
                {allOptions.map((gymnast, index) => (
                <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                >
                   ({gymnast.id})&nbsp;&nbsp;&nbsp;&nbsp;{gymnast.first_name} {gymnast.last_name} 
                </li>
                ))}
            </ul>
        </div>
    );
  };
  
  export default GymnastList;