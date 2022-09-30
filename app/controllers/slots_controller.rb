# frozen_string_literal: true

class SlotsController < ApplicationController
  def index; end

  def create
    start_time = Date.parse(params[:date]).beginning_of_day
    start_time.change(hour: params[:hour], min: params[:mins])
    Slot.create!(start_time: start_time, end_time: start_time + params[:duration].minutes)

    head :no_content, status: :created
  end

  def booked_slots
    render(
      status: :ok,
      json: { slots: BookedSlotsService.new.find_booked_slots(Date.parse(params[:date])) }
    )
  end
end
