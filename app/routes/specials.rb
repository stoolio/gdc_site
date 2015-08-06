module GDC
  module Routes
    class Specials < Base
      get '/specials/' do
        @items = GDC::Models::Special.all
        haml :list
      end

      get '/specials/:sku/' do
        sku = params[:sku]
        @item = GDC::Models::Special.find(sku)
        haml :detail
      end
    end
  end
end
