class SlotDateChannel < ApplicationCable::Channel
  def subscribed
    stream_from "slot_date_#{Date.parse(params[:date])}"
  end

  def unsubscribed; end
end
