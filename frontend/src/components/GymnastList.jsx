import React from "react";

const GymnastList = ({ allOptions }) => {

    return (
        <div className="mt-2 w-full bg-white border border-gray-300 rounded-lg z-10">
            <ul className="flex flex-col">
                {allOptions.map((gymnast, index) => (
                <li
                    key={index}
                    className="px-4 md:px-20 py-2 hover:bg-gray-200 cursor-pointer text-base md:text-lg lg:text-xl"
                >
                   ({gymnast.id})&nbsp;&nbsp;&nbsp;&nbsp;{gymnast.first_name} {gymnast.last_name} 
                </li>
                ))}
            </ul>
        </div>
    );
  };
  
  export default GymnastList;