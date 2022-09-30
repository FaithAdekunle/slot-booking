import axios from "axios";
import React, { useMemo, useState, useEffect, useCallback } from "react";

import PickDay from "./PickDay";
import PickDuration from "./PickDuration";
import { getAvailableSlots } from "../../../lib/slots";

import style from "./Slots.module.css";

const Slots = () => {
  const [slotDate, setSlotDate] = useState();
  const [bookedSlots, setBookedSlots] = useState();
  const [slotDuration, setSlotDuration] = useState();
  const [loadingBookedSlots, setLoadingBookedSlots] = useState(false);

  const loadBookedSlots = useCallback(() => {
    axios
      .get("/slots/booked_slots", {
        params: {
          date: slotDate.toDateString()
        }
      })
      .then(data => {
        setBookedSlots(data.data.slots);
      })
      .finally(() => setLoadingBookedSlots(false));
  }, [slotDate]);

  useEffect(() => {
    if (slotDate) {
      setBookedSlots(undefined);
      setLoadingBookedSlots(true);
    }
  }, [slotDate]);

  useEffect(() => {
    if (loadingBookedSlots) loadBookedSlots();
  }, [loadingBookedSlots, loadBookedSlots]);

  const availableSlots = useMemo(() => {
    if (bookedSlots && slotDuration) {
      return getAvailableSlots(slotDuration.value, bookedSlots);
    }
  }, [bookedSlots, slotDuration]);

  console.log(bookedSlots, availableSlots);

  return (
    <div className="container">
      <PickDuration
        slotDuration={slotDuration}
        setSlotDuration={setSlotDuration}
      />
      <br />
      <hr />
      <br />
      <PickDay
        slotDate={slotDate}
        setSlotDate={setSlotDate}
        disabled={loadingBookedSlots}
      />
    </div>
  );
};

export default Slots;
