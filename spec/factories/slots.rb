FactoryBot.define do
  factory(:slot) do
    end_time { Time.parse('2022-02-01T22:30:00.000Z') }
    start_time { Time.parse('2022-02-01T20:00:00.000Z') }
  end
end
