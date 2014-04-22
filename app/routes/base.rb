require 'sinatra/namespace'
require 'sinatra/content_for'

module GDC
  module Routes
    class Base < Sinatra::Base
      configure do
        set :views, 'app/views'
        set :root, File.expand_path('../../../', __FILE__)

        register Sinatra::Namespace
      end

      helpers GDC::Helpers::Base
      helpers GDC::Helpers::Partials
      helpers Sinatra::ContentFor
    end
  end
end
