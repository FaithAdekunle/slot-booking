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

const addIntervalMinutes = (date, interval = INTERVAL_MINS) => {
  return new Date(date.getTime() + interval * 60000);
};

const timeOfDate = date => {
  let hour = date.getUTCHours();
  let minute = date.getUTCMinutes();
  minute = minute || "00";

  if (hour == 12) return `${hour}:${minute}pm`;
  if (hour < 12) return `${hour || 12}:${minute}am`;
  return `${hour % 12}:${minute}pm`;
};

const slotIsAvailable = (date, slotDuration, bookedSlots) => {
  let interval = 0;

  while (interval < slotDuration) {
    const slot = addIntervalMinutes(date, interval);
    const hour = slot.getUTCHours();
    const minute = slot.getUTCMinutes();
    if (bookedSlots[`${hour}:${minute}`]) return false;

    interval += INTERVAL_MINS;
  }

  return true;
};

export const getAvailableSlots = (slotDuration, bookedSlots) => {
  let date = new Date();
  const availableSlots = [];
  date.setUTCHours(0, 0, 0, 0);
  const day = date.getUTCDate();
  let endDate = addIntervalMinutes(date, slotDuration);

  while (endDate.getUTCDate() == day) {
    endDate = addIntervalMinutes(date, slotDuration);

    if (slotIsAvailable(date, slotDuration, bookedSlots)) {
      availableSlots.push({
        value: date.getTime(),
        hour: date.getUTCHours(),
        mins: date.getUTCMinutes(),
        label: `${timeOfDate(date)} to ${timeOfDate(endDate)}`
      });
    }

    date = addIntervalMinutes(date);
  }

  return availableSlots;
};

export const dropdownStyles = {
  menu: base => ({ ...base, zIndex: 9999 })
};
