# frozen_string_literal: true

class SlotsController < ApplicationController
  def index; end

  def create
    start_time = Date.parse(params[:date]).beginning_of_day.change(hour: params[:hour], min: params[:mins])
    slot = Slot.create!(start_time: start_time, end_time: start_time + params[:duration].to_i.minutes)

    booked_slots = BookedSlotsService.new.slots_within(slot, params[:interval_mins].to_i)
    ActionCable.server.broadcast("slot_date_#{slot.start_time.to_date}", { slots: booked_slots })

    render(
      status: :created,
      json: { slots: booked_slots }
    )
  end

  def booked_slots
    render(
      status: :ok,
      json: { slots: BookedSlotsService.new.find_booked_slots(Date.parse(params[:date]), params[:interval_mins].to_i) }
    )
  end
end
