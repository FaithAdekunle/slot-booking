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
FactoryBot.define do
  factory(:slot) do
    end_time { Time.parse('2022-02-01T22:30:00.000Z') }
    start_time { Time.parse('2022-02-01T20:00:00.000Z') }
  end
end
