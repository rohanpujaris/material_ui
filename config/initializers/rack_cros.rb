Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    resource '*', headers: :any, methods: [:get, :post, :options, :patch, :delete], expose: ['Authorization']
  end
end
