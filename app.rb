require 'bundler/setup'

$: << File.expand_path('../', __FILE__)

require 'sinatra/base'
require 'sinatra/reloader'

require 'json'

require 'app/decorators'
require 'app/helpers'
require 'app/models'
require 'app/routes'

module GDC
  # App configuration
  class App < Sinatra::Base
    register Sinatra::Reloader # remove for production
    configure do
      enable :reloader
    end

    use GDC::Routes::Static
    use GDC::Routes::EngagementRings
    use GDC::Routes::NotFound
  end
end
