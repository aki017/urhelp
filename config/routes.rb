Rails.application.routes.draw do
  root "static_page#index"

  get "builds", to: "builds#index"
  get "builds/:id", to: "builds#show"
end
