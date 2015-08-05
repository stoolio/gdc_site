require 'sinatra/namespace'
require 'sinatra/content_for'
require 'sinatra/partial'
require 'sinatra/reloader'

# URI.escape used in pinterest button generation
require 'uri'

module GDC
  module Routes
    class Base < Sinatra::Base
      configure do
        set :views, 'app/views'
        set :root, File.expand_path('../../../', __FILE__)

        register Sinatra::Partial
        enable :partial_underscores

        register Sinatra::Namespace
      end

      configure :development do
        register Sinatra::Reloader
        enable :logging
      end

      helpers GDC::Helpers::Base
      helpers GDC::Helpers::Breadcrumbs
      helpers GDC::Helpers::Menu
      helpers Sinatra::ContentFor

      # get %r{(/.*[^\/])$} do
      #   redirect to("#{params[:captures].first}/"), 301
      # end

      # not_found do
      #   haml :'404'
      # end

      # get '/404/' do
      #   haml :'404'
      # end
    end
  end
end
