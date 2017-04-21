Rails.application.routes.draw do
  resources :comments
  get 'prodcarts/index'

  resources :products
  devise_for :users
  root 'welcome#index'
  get 'registro_api' => 'welcome#registro_api'
  post 'users/registroapi' => 'users#registroapi'
  get 'perfil' => 'users#perfil'
  get 'editar_perfil' => 'users#editar_perfil'
 
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

