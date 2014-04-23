require 'sinatra/namespace'
require 'sinatra/content_for'
require 'sinatra/partial'

module GDC
  module Routes
    class Base < Sinatra::Base
      configure do
        set :views, 'app/views'
        set :root, File.expand_path('../../../', __FILE__)

        register Sinatra::Namespace
        register Sinatra::Partial

        enable :partial_underscores
      end

      helpers GDC::Helpers::Base
      helpers Sinatra::ContentFor
    end
  end
end
