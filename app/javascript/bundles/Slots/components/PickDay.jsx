import { format } from "date-fns";
import PropTypes from "prop-types";
import React, { useMemo } from "react";
import { DayPicker } from "react-day-picker";

import "react-day-picker/dist/style.css";

const PickDay = ({ slotDate, setSlotDate, disabled }) => {
  const footer = useMemo(() => {
    return (
      <>
        <br />
        {slotDate ? (
          <p>You picked {format(slotDate, "PP")}.</p>
        ) : (
          <p>Please pick a day.</p>
        )}
      </>
    );
  }, [slotDate]);

  return (
    <DayPicker
      mode="single"
      footer={footer}
      selected={slotDate}
      onSelect={setSlotDate}
      disabled={disabled}
    />
  );
};

PickDay.defaultProps = {
  slotDate: undefined
};

PickDay.propTypes = {
  disabled: PropTypes.bool.isRequired,
  slotDate: PropTypes.instanceOf(Object),
  setSlotDate: PropTypes.func.isRequired
};

export default PickDay;
