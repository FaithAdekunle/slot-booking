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
        { 'slots' => { '20:0' => true, '20:15' => true, '20:30' => true, '20:45' => true, '21:0' => true, '21:15' => true, '21:30' => true, '21:45' => true,
                       '22:0' => true, '22:15' => true } }
      )
    end
  end

  describe 'POST create' do
    it 'returns booked slots' do
      post :create, { params: { date: Date.current.to_s, interval_mins: 15, duration: 15, hour: 1, mins: 0 } }
      expect(response).to have_http_status(:created)
      expect(JSON.parse(response.body)).to eq({ 'slots' => { '1:0' => true } })
    end
  end
end
