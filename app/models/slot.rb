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
  validate :validate_overlap

  private

  def validate_overlap
    if self.class.unscoped.exists?(['(? > start_time AND ? < end_time)  OR (? > start_time AND ? < end_time) OR (? < start_time AND ? > end_time)',
                                    start_time, start_time, end_time, end_time, start_time, end_time])
      errors.add(:start_time, 'Overlap not allowed')
    end
  end
end
