# == Schema Information
#
# Table name: slots
#
#  id         :bigint           not null, primary key
#  end_time   :datetime         not null
#  start_time :datetime         not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_slots_on_end_time    (end_time) UNIQUE
#  index_slots_on_start_time  (start_time) UNIQUE
#
class Slot < ApplicationRecord
  validates_presence_of :start_time, :end_time
  validates_uniqueness_of :start_time, :end_time

  def self.seed
    Slot.delete_all
    start_time = Time.current.beginning_of_hour
    end_time = start_time + 2.hours
    Slot.create!(start_time: start_time, end_time: end_time)
    new_end_time = start_time + 1.hour
    new_start_time = start_time - 1.hour
    Slot.create!(start_time: new_start_time, end_time: new_end_time)
    # where('(start_time < ? AND end_time > ?)  OR (start_time < ? AND end_time > ?)', new_start_time,
    #       new_start_time, new_end_time, new_end_time)
  end
end
