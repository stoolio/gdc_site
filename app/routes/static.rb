module GDC
  module Routes
    class Static < Base
      get '/' do
        haml :home
      end

      get '/about/' do
        haml :about
      end

      get '/diamonds/' do
        haml :diamonds
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
