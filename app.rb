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
    configure :development do
      register Sinatra::Reloader
    end

    use GDC::Routes::Static
    use GDC::Routes::EngagementRings

    # catchall
    not_found do
      haml :'404'
    end
  end
end
