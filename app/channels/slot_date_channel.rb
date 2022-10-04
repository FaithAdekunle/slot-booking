class SlotDateChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'newly_booked_slots'
  end

  def unsubscribed; end
end
