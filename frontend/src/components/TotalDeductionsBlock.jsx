import React, {useState, useEffect} from "react";
import BlueButton from "../components/BlueButton";
import { useNavigate } from "react-router-dom";

const TotalDeductionsBlock = ({ total }) => {

  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    setRole(userRole);
  }, []);

  const handleSubmitClick = () => {
    localStorage.setItem("total", total);

    if (role === "judge") {
      navigate("/scorecardjudges");
    } else {
      navigate("/startingscore");
    }
  };

  return (
    <div className="flex w-[365px] items-center justify-center p-[10px] bg-light-periwinkle">
      <div className="flex items-center justify-center gap-[40px]">
        <div className="flex items-center gap-[10px]">
          <div className="font-montserrat font-medium text-prussian-blue text-[25px] text-center">
            Total:
          </div>
          <div className="font-montserrat font-semibold text-prussian-blue text-[25px] text-center">
            {parseFloat(total).toFixed(3)}
          </div>
        </div>
        <div onClick={handleSubmitClick}>
            <BlueButton title="Submit" />
          </div>
      </div>
    </div>
  );
};

export default TotalDeductionsBlock;