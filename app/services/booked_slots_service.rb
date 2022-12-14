class BookedSlotsService
  def slots_within(slot, interval_mins, booked_slots = {})
    start_time = floor_time_to_interval(slot.start_time, interval_mins.minutes)
    end_time = slot.end_time

    while start_time < end_time
      booked_slots[start_time.to_s] = start_time
      start_time += interval_mins.minutes
    end

    booked_slots
  end

  def find_booked_slots(date, duration, interval_mins)
    latest_end = date + 1.day - interval_mins.minutes + duration.minutes
    slots = Slot.where('(start_time > ? AND start_time < ?) OR (end_time > ? AND end_time < ?) OR (start_time < ? AND end_time > ?)', date,
                       latest_end, date, latest_end, date, latest_end)
    slots.each_with_object({}) { |slot, booked_slots| slots_within(slot, interval_mins, booked_slots) }
  end

  private

  def floor_time_to_interval(time, interval)
    Time.at((time.to_f / interval).floor * interval).utc
  end
end
