# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'home#index'

  defaults format: :json do
    resources :line_items, only: [:index, :update, :show]
  end
end