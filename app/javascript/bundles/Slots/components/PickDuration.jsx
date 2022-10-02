import Select from "react-select";
import PropTypes from "prop-types";
import React, { useMemo } from "react";

import { getSlotDurations, dropdownStyles } from "../../../lib/slots";

const PickDuration = ({ slotDuration, setSlotDuration }) => {
  const slotDurations = useMemo(() => getSlotDurations(), []);

  return (
    <Select
      value={slotDuration}
      styles={dropdownStyles}
      options={slotDurations}
      onChange={setSlotDuration}
      placeholder="Select duration..."
    />
  );
};

PickDuration.defaultProps = {
  slotDuration: undefined
};

PickDuration.propTypes = {
  slotDuration: PropTypes.instanceOf(Object),
  setSlotDuration: PropTypes.func.isRequired
};

export default PickDuration;
