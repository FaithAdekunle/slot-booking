class BookedSlotsService
  INTERVAL_MINS = 15

  def find_booked_slots(date)
    slots = Slot.where(start_time: date.all_day)

    slots.each_with_object({}) do |slot, booked_slots|
      end_time = slot.end_time
      start_time = slot.start_time

      while start_time < end_time
        booked_slots["#{start_time.hour}:#{start_time.min}"] = true
        start_time += INTERVAL_MINS.minutes
      end
    end
  end
end
