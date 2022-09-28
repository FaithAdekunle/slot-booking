# == Schema Information
#
# Table name: slots
#
#  id         :integer          not null, primary key
#  end_time   :datetime         not null
#  start_time :datetime         not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Slot < ApplicationRecord
  validates_presence_of :start_time, :end_time
end
