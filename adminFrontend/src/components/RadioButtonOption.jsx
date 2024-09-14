import PropTypes from "prop-types";
import React from "react";
import FilledRadioSelectIcon from "../components/FilledRadioSelectIcon";
import RadioSelectIcon from "../components/RadioSelectIcon";

const RadioButtonOption = ({ text, selected, setSelected }) => {

  return (
    <div className="inline-flex items-center gap-5 px-4 py-2 bg-anti-flash-white rounded-lg cursor-pointer" onClick={setSelected}>
      {selected ? <FilledRadioSelectIcon /> : <RadioSelectIcon />}
      <div className="relative font-medium text-prussian-blue font-montserrat text-2xl">
        {text}
      </div>
    </div>
  );
};

RadioButtonOption.propTypes = {
  text: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  setSelected: PropTypes.func.isRequired,
  setOtherSelected: PropTypes.func.isRequired,
};

export default RadioButtonOption;