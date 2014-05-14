module GDC
  module Routes
    class Static < Base
      get '/' do
        haml :home
      end

      get '/about/?' do
        haml :about
      end

      namespace '/diamonds/?' do
        get do
          haml :diamonds
        end

        get '/quote/?' do
          haml :diamond_quote
        end
      end

      get '/contact/?' do
        haml :contact
      end
    end
  end
end
