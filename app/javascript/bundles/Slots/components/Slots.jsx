import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  useCallback
} from "react";
import dayjs from "dayjs";
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
  const [confirmation, setConfirmation] = useState();
  const [loadingBookedSlots, setLoadingBookedSlots] = useState(false);

  const cable = useMemo(() => ActionCable.createConsumer("/cable"), []);

  const parseBookedSlots = useCallback(slots => {
    const obj = {};
    Object.values(slots).forEach(startTime => {
      obj[dayjs(startTime).format("DD/MM/YYYY HH:m")] = true;
    });
    return obj;
  }, []);

  const loadBookedSlots = useCallback(() => {
    axios
      .get("/slots/booked_slots", {
        params: {
          date: slotDate,
          interval_mins: INTERVAL_MINS,
          duration: slotDuration.value
        }
      })
      .then(data => {
        const obj = {};
        setBookedSlots(parseBookedSlots(data.data.slots));
      })
      .catch(error => console.log(error))
      .finally(() => setLoadingBookedSlots(false));
  }, [slotDate, slotDuration, parseBookedSlots]);

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
    if (slotDate && slotDuration) {
      setBookedSlots(undefined);
      setLoadingBookedSlots(true);
    }
  }, [slotDate, slotDuration]);

  useEffect(() => {
    setSelectedSlot(undefined);
  }, [slotDate, slotDuration]);

  useEffect(() => {
    if (loadingBookedSlots) loadBookedSlots();
  }, [loadingBookedSlots, loadBookedSlots]);

  const availableSlots = useMemo(() => {
    if (bookedSlots && slotDuration) {
      return getAvailableSlots(slotDate, slotDuration.value, bookedSlots);
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
      interval_mins: INTERVAL_MINS,
      duration: slotDuration.value,
      start_time: selectedSlot.start
    };

    axios
      .post("/slots", params)
      .then(data => {
        setSelectedSlot({ label: "Select time slot..." });
        setBookedSlots(slots => ({
          ...slots,
          ...parseBookedSlots(data.data.slots)
        }));
        setConfirmation("Your slot has been booked sucessfully.");
      })
      .catch(error => console.log(error))
      .finally(() => setBooking(false));
  }, [booking, selectedSlot, slotDate, slotDuration, parseBookedSlots]);

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
                  <p className="text-justify">{confirmation}</p>
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
