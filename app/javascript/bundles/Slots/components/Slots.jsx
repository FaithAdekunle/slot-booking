import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  useCallback
} from "react";
import axios from "axios";
import ActionCable from "actioncable";

import PickDay from "./PickDay";
import PickSlot from "./PickSlot";
import PickDuration from "./PickDuration";
import { getAvailableSlots, INTERVAL_MINS } from "../../../lib/slots";

const Slots = () => {
  const cableSubscription = useRef();

  const [slotDate, setSlotDate] = useState();
  const [booking, setBooking] = useState(false);
  const [bookedSlots, setBookedSlots] = useState();
  const [selectedSlot, setSelectedSlot] = useState();
  const [slotDuration, setSlotDuration] = useState();
  const [loadingBookedSlots, setLoadingBookedSlots] = useState(false);

  const cable = useMemo(() => ActionCable.createConsumer("/cable"), []);

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
      cableSubscription.current?.unsubscribe();
      cableSubscription.current = cable.subscriptions.create(
        {
          channel: "SlotDateChannel",
          date: slotDate.toDateString()
        },
        {
          received: data => {
            setBookedSlots(slots => ({ ...slots, ...data.slots }));
          }
        }
      );
    }
  }, [cable, slotDate]);

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
    if (loadingBookedSlots) return "Loading available slots...";

    if (!slotDate && !slotDuration)
      return "Choose day and duration of the slot you want to book.";

    if (slotDate) return "Choose the duration of the slot you want to book.";

    return "Choose the day of the slot you want to book.";
  }, [slotDate, slotDuration, loadingBookedSlots]);

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
        setSelectedSlot({ label: "Select time slot..." });
        setBookedSlots(slots => ({ ...slots, ...data.data.slots }));
      })
      .catch(error => console.log(error))
      .finally(() => setBooking(false));
  }, [booking, selectedSlot, slotDate, slotDuration]);

  return (
    <div className="container h-100">
      <div className="row d-flex h-100 justify-content-center align-items-center">
        <div className="col-6 bg-light pt-5 border">
          <div className="row">
            <div className="col-6">
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
            </div>
            <div className="col-6 pb-5">
              <div className="row d-flex h-100 justify-content-center align-items-center border border-right-0 border-top-0 border-bottom-0">
                <div className="container">
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
                    <div className="clearfix">
                      <br />
                      <button
                        type="button"
                        disabled={booking}
                        onClick={bookSlot}
                        className="btn btn-outline-dark float-right"
                      >
                        Book slot
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slots;
