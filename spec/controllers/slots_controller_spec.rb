require 'rails_helper'

RSpec.describe SlotsController, type: :controller do
  describe 'GET index' do
    it 'renders the index template' do
      get :index
      expect(response).to render_template('index')
    end
  end

  describe 'GET booked_slots' do
    let(:slot) { create(:slot) }

    it 'returns booked slots' do
      get :booked_slots, { params: { date: slot.start_time.to_s, interval_mins: 15 } }
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)).to eq(
        { 'slots' => { '2022-02-01 20:00:00 UTC' => '2022-02-01T20:00:00.000Z',
                       '2022-02-01 20:15:00 UTC' => '2022-02-01T20:15:00.000Z',
                       '2022-02-01 20:30:00 UTC' => '2022-02-01T20:30:00.000Z',
                       '2022-02-01 20:45:00 UTC' => '2022-02-01T20:45:00.000Z',
                       '2022-02-01 21:00:00 UTC' => '2022-02-01T21:00:00.000Z',
                       '2022-02-01 21:15:00 UTC' => '2022-02-01T21:15:00.000Z',
                       '2022-02-01 21:30:00 UTC' => '2022-02-01T21:30:00.000Z',
                       '2022-02-01 21:45:00 UTC' => '2022-02-01T21:45:00.000Z',
                       '2022-02-01 22:00:00 UTC' => '2022-02-01T22:00:00.000Z',
                       '2022-02-01 22:15:00 UTC' => '2022-02-01T22:15:00.000Z' } }
      )
    end
  end

  describe 'POST create' do
    it 'returns booked slots' do
      post :create, { params: { start_time: Time.current.beginning_of_day + 1.hour, interval_mins: 15, duration: 15 } }
      expect(response).to have_http_status(:created)
      expect(JSON.parse(response.body)).to eq({ 'slots' => { '2022-10-04 01:00:00 UTC' => '2022-10-04T01:00:00.000Z' } })
    end
  end
end
