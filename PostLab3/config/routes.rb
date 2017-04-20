Rails.application.routes.draw do
  get 'prodcarts/index'

  resources :products
  devise_for :users
  root 'welcome#index'
  get 'registro_api' => 'welcome#registro_api'
  post 'users/registroapi' => 'users#registroapi'
 
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

