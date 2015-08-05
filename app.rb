require 'bundler/setup'

$LOAD_PATH << File.expand_path('../', __FILE__)

require 'sinatra/base'
require 'sinatra/reloader'

require 'haml'
require 'redcarpet'
require 'json'

require 'app/models'
require 'app/decorators'
require 'app/helpers'
require 'app/routes'

module GDC
  # App configuration
  class App < Sinatra::Base
    configure :development do
      register Sinatra::Reloader
      enable :logging
    end

    use Rack::Session::Pool,  key: 'rack.session',
                              path: '/',
                              expire_after: 2_592_000,
                              secret: 'itsasecret'

    use GDC::Routes::Static
    use GDC::Routes::EngagementRings
    use GDC::Routes::Forms
    use GDC::Routes::Specials
    use GDC::Routes::Blog
    # use GDC::Routes::Education
    use GDC::Routes::Utility
  end
end

include GDC::Models
