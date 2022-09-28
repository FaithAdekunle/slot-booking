Rails.application.routes.draw do
  resources :slots, only: %i[index create] do
    get :available_slots, on: :collection
  end

  root 'slots#index'
end
