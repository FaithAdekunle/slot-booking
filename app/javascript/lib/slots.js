import dayjs from "dayjs";

export const INTERVAL_MINS = 15;

const minsToHours = mins => {
  if (mins < 60) return `${mins}mins`;

  const hour = Math.floor(mins / 60);
  const minute = mins % 60;

  return `${hour}${hour > 1 ? "hrs" : "hr"}${
    minute ? ` ${minute}${minute > 1 ? "mins" : "min"}` : ""
  }`;
};

export const getSlotDurations = () => {
  const durations = [];
  for (let mins = INTERVAL_MINS; mins <= 1440; mins += INTERVAL_MINS) {
    durations.push({ label: minsToHours(mins), value: mins });
  }
  return durations;
};

const slotIsAvailable = (date, slotDuration, bookedSlots) => {
  let interval = 0;

  while (interval < slotDuration) {
    const slot = date.add(interval, "minute");
    if (bookedSlots[slot.format("DD/MM/YYYY HH:m")]) return false;

    interval += INTERVAL_MINS;
  }

  return true;
};

export const getAvailableSlots = (slotDate, slotDuration, bookedSlots) => {
  const date = dayjs(slotDate);
  let nextSlotDate = dayjs(slotDate);
  const availableSlots = [];

  while (date.isSame(nextSlotDate, "day")) {
    if (slotIsAvailable(nextSlotDate, slotDuration, bookedSlots)) {
      availableSlots.push({
        value: nextSlotDate.valueOf(),
        start: nextSlotDate.toString(),
        label: nextSlotDate.format("h:mma")
      });
    }

    nextSlotDate = nextSlotDate.add(INTERVAL_MINS, "minute");
  }

  return availableSlots;
};

export const dropdownStyles = {
  menu: base => ({ ...base, zIndex: 9999 })
};
