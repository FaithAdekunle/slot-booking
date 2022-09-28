Rails.application.routes.draw do
  resources :slots, only: %i[create] do
    get :booked_slots, on: :collection
  end

  root 'slots#index'
end
