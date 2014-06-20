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

        register Sinatra::Namespace
        register Sinatra::Partial

        enable :partial_underscores
        enable :logging
      end
      configure do
        register Sinatra::Reloader
        enable :reloader
      end

      helpers do
        def find_template(views, name, engine, &block)
          klass = self.class.to_s.split('::').last
          klass[0] = klass[0].downcase
          (klass.gsub!(/([A-Z])/,'_\1') || klass).downcase!
          ["#{views}/#{klass}", views]
            .each { |v| super(v, name, engine, &block) }
        end
      end

      helpers GDC::Helpers::Base
      helpers GDC::Helpers::Breadcrumbs
      helpers GDC::Helpers::Menu
      helpers GDC::Helpers::Microformatted
      helpers Sinatra::ContentFor

      # redirects any routes not ending in slashes to a slashed route
      # Ex:
      # /foo/bar will redirect to /foo/bar/
      # /baz will redirect to /baz/
      get %r{(/.*[^\/])$} do
        redirect to("#{params[:captures].first}/"), 301
      end
    end
  end
end
