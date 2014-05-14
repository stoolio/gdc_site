require 'bundler/setup'

$: << File.expand_path('../', __FILE__)

require 'sinatra/base'
require 'sinatra/reloader'

require 'json'

require 'app/models'
require 'app/decorators'
require 'app/helpers'
require 'app/routes'

module GDC
  # App configuration
  class App < Sinatra::Base
    configure do
      register Sinatra::Reloader
      enable :reloader
    end

    use GDC::Routes::Static
    use GDC::Routes::EngagementRings
    use GDC::Routes::Forms
    use GDC::Routes::Education
    use GDC::Routes::NotFound
  end
end

include GDC::Models
