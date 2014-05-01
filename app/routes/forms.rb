module GDC
  module Routes
    class Forms < Base
      get '/diamond-quote' do
        haml :diamond_quote
      end
      post '/diamond-quote' do
        request.body.read
      end
    end
  end
end
