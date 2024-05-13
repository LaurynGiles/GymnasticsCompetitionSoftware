
import React from "react";
import BlueButton from "../components/BlueButton";
import InputBox from "../components/InputBox";
import SmallLogo from "../components/SmallLogo";

const LoginJudges = () => {
  return (
    <div className="bg-[#6279b8] flex flex-row justify-center w-full">
      <div className="bg-glaucous overflow-hidden w-[400px] h-[800px]">
        <div className="relative w-[446px] h-[769px] top-[-162px] left-[-23px]">
          <div className="inline-flex flex-col items-center gap-[20px] px-[50px] py-[70px] absolute top-[500px] left-[34px]">
            <InputBox />
            <BlueButton />
          </div>
          <SmallLogo />
        </div>
      </div>
    </div>
  );
};

export default LoginJudges;

// import React from "react";

// const LoginJudges = () => {
//   return (
//     <div className="flex justify-center items-center h-screen bg-glaucous">
//       <div className="flex flex-col items-center gap-20 px-10 py-10 bg-white rounded-lg">
//         <div className="bg-bright-white rounded-md p-3">
//           <div className="text-center font-medium text-text text-lg">
//             GSA number
//           </div>
//         </div>
//         <button className="bg-prussian-blue rounded-md shadow-md px-6 py-3">
//           <div className="font-medium text-white text-lg">Login</div>
//         </button>
//       </div>
//       <div className="absolute bottom-0 right-0">
//         <img
//           className="w-40 h-40 object-cover"
//           alt="Logo"
//           src="logo.png"
//         />
//       </div>
//     </div>
//   );
// };

// export default LoginJudges;