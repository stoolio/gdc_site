module GDC
  module Routes
    class Forms < Base
      get '/diamond-quote' do
        haml :diamond_quote
      end
    end
  end
end
