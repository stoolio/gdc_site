module GDC
  module Routes
    class Static < Base
      get '/' do
        haml :home
      end

      get '/about/' do
        haml :about
      end

      namespace '/diamonds/' do
        get do
          haml :diamonds
        end

        get 'quote/' do
          haml :diamonds_quote
        end
      end

      get '/contact/' do
        haml :contact
      end

      namespace '/policies/' do
        get do
          haml :"policies/index"
        end

        get ":policy/" do
          @policy = params[:policy]
          haml :"policies/policy"
        end
      end
    end
  end
end
