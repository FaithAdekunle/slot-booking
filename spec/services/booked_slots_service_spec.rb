require 'rails_helper'

RSpec.describe BookedSlotsService, type: :model do
  describe '#slots_within' do
    let(:slot) { create(:slot) }

    it 'should return booked slots within slot' do
      booked_slots = BookedSlotsService.new.slots_within(slot, 15)
      puts booked_slots
      expect(booked_slots).to eq(
        {
          '2022-02-01 20:00:00 UTC' => Time.parse('Tue, 01 Feb 2022 20:00:00.000000000 UTC +00:00'),
          '2022-02-01 20:15:00 UTC' => Time.parse('Tue, 01 Feb 2022 20:15:00.000000000 UTC +00:00'),
          '2022-02-01 20:30:00 UTC' => Time.parse('Tue, 01 Feb 2022 20:30:00.000000000 UTC +00:00'),
          '2022-02-01 20:45:00 UTC' => Time.parse('Tue, 01 Feb 2022 20:45:00.000000000 UTC +00:00'),
          '2022-02-01 21:00:00 UTC' => Time.parse('Tue, 01 Feb 2022 21:00:00.000000000 UTC +00:00'),
          '2022-02-01 21:15:00 UTC' => Time.parse('Tue, 01 Feb 2022 21:15:00.000000000 UTC +00:00'),
          '2022-02-01 21:30:00 UTC' => Time.parse('Tue, 01 Feb 2022 21:30:00.000000000 UTC +00:00'),
          '2022-02-01 21:45:00 UTC' => Time.parse('Tue, 01 Feb 2022 21:45:00.000000000 UTC +00:00'),
          '2022-02-01 22:00:00 UTC' => Time.parse('Tue, 01 Feb 2022 22:00:00.000000000 UTC +00:00'),
          '2022-02-01 22:15:00 UTC' => Time.parse('Tue, 01 Feb 2022 22:15:00.000000000 UTC +00:00')
        }
      )
    end
  end

  describe '#find_booked_slots' do
    let(:slot) { create(:slot) }

    it 'should return booked slots for the day' do
      booked_slots = BookedSlotsService.new.find_booked_slots(slot.start_time, 30, 15)
      expect(booked_slots).to eq(
        {
          '2022-02-01 20:00:00 UTC' => Time.parse('Tue, 01 Feb 2022 20:00:00.000000000 UTC +00:00'),
          '2022-02-01 20:15:00 UTC' => Time.parse('Tue, 01 Feb 2022 20:15:00.000000000 UTC +00:00'),
          '2022-02-01 20:30:00 UTC' => Time.parse('Tue, 01 Feb 2022 20:30:00.000000000 UTC +00:00'),
          '2022-02-01 20:45:00 UTC' => Time.parse('Tue, 01 Feb 2022 20:45:00.000000000 UTC +00:00'),
          '2022-02-01 21:00:00 UTC' => Time.parse('Tue, 01 Feb 2022 21:00:00.000000000 UTC +00:00'),
          '2022-02-01 21:15:00 UTC' => Time.parse('Tue, 01 Feb 2022 21:15:00.000000000 UTC +00:00'),
          '2022-02-01 21:30:00 UTC' => Time.parse('Tue, 01 Feb 2022 21:30:00.000000000 UTC +00:00'),
          '2022-02-01 21:45:00 UTC' => Time.parse('Tue, 01 Feb 2022 21:45:00.000000000 UTC +00:00'),
          '2022-02-01 22:00:00 UTC' => Time.parse('Tue, 01 Feb 2022 22:00:00.000000000 UTC +00:00'),
          '2022-02-01 22:15:00 UTC' => Time.parse('Tue, 01 Feb 2022 22:15:00.000000000 UTC +00:00')
        }
      )
    end
  end
end
