import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";

import style from "./Slots.module.css";

const INTERVAL_MINS = 15;

const Slots = () => {
  const [slotDate, setSlotDate] = useState();
  const [bookedSlots, setBookedSlots] = useState();
  const [slotDuration, setSlotDuration] = useState();
  const [loadingBookedSlots, setLoadingBookedSlots] = useState(false);

  const loadBookedSlots = useCallback(() => {
    axios
      .get("/slots/booked_slots", {
        params: {
          // date: slotDate,
          date: new Date(),
          interval_mins: INTERVAL_MINS
        }
      })
      .then(data => {
        setBookedSlots(data.data.slots);
      })
      .finally(() => setLoadingBookedSlots(false));
  }, []);

  useEffect(() => {
    if (slotDate) {
      setBookedSlots(undefined);
      setLoadingBookedSlots(true);
    }
  }, [slotDate]);

  useEffect(() => {
    if (loadingBookedSlots) loadBookedSlots();
  }, [loadingBookedSlots, loadBookedSlots]);

  console.log(bookedSlots);

  return (
    <div className="container">
      <h3>Slots React</h3>
    </div>
  );
};

export default Slots;
