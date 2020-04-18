Rails.application.routes.draw do
  devise_for :users
  root 'groups#index'
  resources :users, only: [:index, :edit, :update] do
    resources :group_users, only: [:index, :update]
  end
  resources :groups, only: [:new, :create, :edit, :update] do
    resources :notes, only: [:index, :new, :create, :edit, :update]
    get 'show/notes', to: 'notes#show', as: 'show_notes'
    get 'note/:id', to: 'notes#detail', as: 'detail_note'
    resources :messages, only: [:index, :create]
    namespace :api do
      resources :messages, only: :index, defaults: { format: 'json' }
    end
  end
  resources :group_users, only: :destroy
end
