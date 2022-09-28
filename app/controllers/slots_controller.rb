# frozen_string_literal: true

class SlotsController < ApplicationController
  def index; end

  def create
    Slot.create!(start_time: params[:start_time], end_time: params[:end_time])

    head :no_content, status: :created
  end

  def booked_slots
    render json: BookedSlotsService.new.find_booked_slots(params[:date]), status: :ok
  end
end
