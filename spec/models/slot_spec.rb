require 'rails_helper'

RSpec.describe Slot, type: :model do
  let(:slot) { create(:slot) }

  it 'is valid with valid attributes' do
    expect(slot).to be_valid
  end

  it 'is not valid without a end_time' do
    slot.end_time = nil
    slot.validate
    expect(slot.errors.messages[:end_time]).to include("can't be blank")
  end

  it 'is not valid without a start_time' do
    slot.start_time = nil
    slot.validate
    expect(slot.errors.messages[:start_time]).to include("can't be blank")
  end

  it 'is not valid with a duplicate end_time' do
    new_slot = described_class.new(start_time: slot.end_time - 15.minutes, end_time: slot.end_time)
    new_slot.validate
    expect(new_slot.errors.messages[:end_time]).to include('has already been taken')
  end

  it 'is not valid with a duplicate start_time' do
    new_slot = described_class.new(start_time: slot.start_time, end_time: slot.start_time + 15.minutes)
    new_slot.validate
    expect(new_slot.errors.messages[:start_time]).to include('has already been taken')
  end
end
