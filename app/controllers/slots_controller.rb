# frozen_string_literal: true

class SlotsController < ApplicationController
  def index; end

  def create
    start_time = Time.parse(params[:start_time])
    slot = Slot.new(start_time: start_time, end_time: start_time + params[:duration].to_i.minutes)

    if slot.save
      booked_slots = BookedSlotsService.new.slots_within(slot, params[:interval_mins].to_i)
      ActionCable.server.broadcast('newly_booked_slots', { start_time: slot.start_time, end_time: slot.end_time })
      render(
        status: :created,
        json: { slots: booked_slots }
      )
    else
      render(
        status: :bad_request,
        json: { errors: slot.errors.messages }
      )
    end
  end

  def booked_slots
    render(
      status: :ok,
      json: { slots: BookedSlotsService.new.find_booked_slots(Time.parse(params[:date]), params[:duration].to_i,
                                                              params[:interval_mins].to_i) }
    )
  end
end
