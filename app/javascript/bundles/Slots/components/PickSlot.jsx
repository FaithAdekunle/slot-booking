import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const PickSlot = ({ selectedSlot, availableSlots, setSelectedSlot }) => {
  return (
    <Select
      value={selectedSlot}
      options={availableSlots}
      onChange={setSelectedSlot}
    />
  );
};

PickSlot.defaultProps = {
  selectedSlot: undefined
};

PickSlot.propTypes = {
  selectedSlot: PropTypes.instanceOf(Object),
  setSelectedSlot: PropTypes.func.isRequired,
  availableSlots: PropTypes.instanceOf(Array).isRequired
};

export default PickSlot;
