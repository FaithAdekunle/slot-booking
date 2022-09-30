import Select from "react-select";
import PropTypes from "prop-types";
import React, { useMemo } from "react";

import { getSlotDurations } from "../../../lib/slots";

const PickDuration = ({ slotDuration, setSlotDuration }) => {
  const slotDurations = useMemo(() => getSlotDurations(), []);

  return (
    <Select
      value={slotDuration}
      options={slotDurations}
      onChange={setSlotDuration}
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
