# frozen_string_literal: true

class SlotsController < ApplicationController
  def index; end

  def create
    Slot.create!(start_time: params[:start_time], end_time: params[:end_time])

    head :no_content, status: :created
  end

  def available_slots
    render json: AvailableSlotsService.new.find_available_slots(params[:date]), status: :ok
  end
end
