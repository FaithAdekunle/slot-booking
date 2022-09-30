import axios from "axios";
import React, { useMemo, useState, useEffect, useCallback } from "react";

import PickDay from "./PickDay";
import PickSlot from "./PickSlot";
import PickDuration from "./PickDuration";
import { getAvailableSlots, INTERVAL_MINS } from "../../../lib/slots";

import style from "./Slots.module.css";

const Slots = () => {
  const [slotDate, setSlotDate] = useState();
  const [booking, setBooking] = useState(false);
  const [bookedSlots, setBookedSlots] = useState();
  const [selectedSlot, setSelectedSlot] = useState();
  const [slotDuration, setSlotDuration] = useState();
  const [loadingBookedSlots, setLoadingBookedSlots] = useState(false);

  const loadBookedSlots = useCallback(() => {
    axios
      .get("/slots/booked_slots", {
        params: {
          interval_mins: INTERVAL_MINS,
          date: slotDate.toDateString()
        }
      })
      .then(data => {
        setBookedSlots(data.data.slots);
      })
      .catch(error => console.log(error))
      .finally(() => setLoadingBookedSlots(false));
  }, [slotDate]);

  useEffect(() => {
    if (slotDate) {
      setBookedSlots(undefined);
      setLoadingBookedSlots(true);
    }
  }, [slotDate]);

  useEffect(() => {
    setSelectedSlot(undefined);
  }, [slotDate, slotDuration]);

  useEffect(() => {
    if (loadingBookedSlots) loadBookedSlots();
  }, [loadingBookedSlots, loadBookedSlots]);

  const availableSlots = useMemo(() => {
    if (bookedSlots && slotDuration) {
      return getAvailableSlots(slotDuration.value, bookedSlots);
    }
  }, [bookedSlots, slotDuration]);

  const instruction = useCallback(() => {
    if (!slotDate && !slotDuration)
      return "Choose day and duration of the slot you want to book";

    if (slotDate) return "Choose the duration of the slot you want to book";

    return "Choose the day of the slot you want to book";
  }, [slotDate, slotDuration]);

  const bookSlot = useCallback(() => {
    if (booking) return;

    setBooking(true);

    const params = {
      mins: selectedSlot.mins,
      hour: selectedSlot.hour,
      interval_mins: INTERVAL_MINS,
      duration: slotDuration.value,
      date: slotDate.toDateString()
    };

    axios
      .post("/slots", params)
      .then(data => {
        setSelectedSlot({});
        setBookedSlots(slots => ({ ...slots, ...data.data.slots }));
      })
      .catch(error => console.log(error))
      .finally(() => setBooking(false));
  }, [booking, selectedSlot, slotDate, slotDuration]);

  return (
    <div className="container">
      <PickDuration
        slotDuration={slotDuration}
        setSlotDuration={setSlotDuration}
      />
      <hr />
      <PickDay
        slotDate={slotDate}
        setSlotDate={setSlotDate}
        disabled={loadingBookedSlots}
      />
      <hr />
      {availableSlots ? (
        <PickSlot
          selectedSlot={selectedSlot}
          availableSlots={availableSlots}
          setSelectedSlot={setSelectedSlot}
        />
      ) : (
        <p>{instruction()}</p>
      )}
      {selectedSlot?.value ? (
        <button disabled={booking} onClick={bookSlot}>
          Book slot
        </button>
      ) : null}
    </div>
  );
};

export default Slots;
