require 'bundler/setup'

$LOAD_PATH << File.expand_path('../', __FILE__)

require 'sinatra/base'
require 'sinatra/reloader'

require 'json'

require 'app/models'
require 'app/decorators'
require 'app/helpers'
require 'app/routes'
require 'app/jobs'

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
    use GDC::Routes::Specials
    use GDC::Routes::Blog
    use GDC::Routes::NotFound
    # use GDC::Routes::Education
    not_found do
      redirect '/404/'
    end
  end
end

include GDC::Models
