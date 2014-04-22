module GDC
  module Routes
    class Static < Base
      get '/' do
        haml :home
      end

      get '/about' do
        haml :about
      end
    end
  end
end
