require 'sinatra/base'
require 'sinatra/reloader'
require 'sinatra/namespace'
require 'sinatra/content_for'
require 'json'
require './helpers'
require './ring_view.rb'

# GDC website module
module GDC
  # handles static pages
  class Application < Sinatra::Base
    configure :development do
      register Sinatra::Reloader
    end
    register Sinatra::Namespace

    helpers Sinatra::ContentFor, BaseHelpers

    # Static Pages
    get '/' do
      haml :home
    end

    get '/about' do
      haml :about
    end

    namespace '/engagement-rings' do
      helpers RingHelpers

      helpers do
        def titlecase(string)
          string ||= ''
          string.split(' ').map(&:capitalize).join(' ')
        end
      end

      get do
        rings = JSON.load(open('data.json'))
        haml :engagement_rings, locals: { rings: rings }
      end

      get '/temp' do
        rings = JSON.load(open('test.json'))
        haml :engagement_rings_test, layout: :layout_test, locals: { rings: rings }
      end
    end

    # If no routes match
    not_found do
      haml :'404'
    end
  end
end
