Rails.application.routes.draw do
  devise_for :users,
    path_names: {  sign_up: 'sign_up' }
    # controllers: { invitations: 'user/invitations' }
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "home#app_entry"

  get 'app/', to: 'home#app_entry'
  get 'app/*all', to: 'home#app_entry'
  get 'dashboard/', to: 'home#app_entry'
  get 'dashboard/*all', to: 'home#app_entry'
end
