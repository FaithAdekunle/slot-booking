class BookedSlotsService
  def slots_within(slot, interval_mins, booked_slots = {})
    end_time = slot.end_time
    start_time = slot.start_time

    while start_time < end_time
      booked_slots["#{start_time.hour}:#{start_time.min}"] = true
      start_time += interval_mins.minutes
    end

    booked_slots
  end

  def find_booked_slots(date, interval_mins)
    slots = Slot.where(start_time: date.all_day)

    slots.each_with_object({}) { |slot, booked_slots| slots_within(slot, interval_mins, booked_slots) }
  end
end
