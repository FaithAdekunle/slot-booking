require 'rails_helper'

RSpec.describe BookedSlotsService, type: :model do
  describe '#slots_within' do
    let(:slot) { create(:slot) }

    it 'should return booked slots within slot' do
      booked_slots = BookedSlotsService.new.slots_within(slot, 15)
      expect(booked_slots).to eq({ '20:0' => true, '20:15' => true, '20:30' => true, '20:45' => true, '21:0' => true, '21:15' => true, '21:30' => true, '21:45' => true,
                                   '22:0' => true, '22:15' => true })
    end
  end

  describe '#find_booked_slots' do
    let(:slot) { create(:slot) }

    it 'should return booked slots for the day' do
      booked_slots = BookedSlotsService.new.find_booked_slots(slot.start_time.to_date, 15)
      expect(booked_slots).to eq({ '20:0' => true, '20:15' => true, '20:30' => true, '20:45' => true, '21:0' => true, '21:15' => true, '21:30' => true, '21:45' => true,
                                   '22:0' => true, '22:15' => true })
    end
  end
end
