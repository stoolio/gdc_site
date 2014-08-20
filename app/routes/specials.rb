module GDC
  module Routes
    class Specials < Base
      helpers do
        def load_items
          files = Dir['db/specials/*.json']
          files.map do |file|
            JSON.load(open(file))
          end
        end
      end

      get '/specials/' do
        @items = load_items
        haml :list
      end

      get '/specials/:sku/' do
        @sku = params[:sku]
        @item = JSON.load(open("db/specials/#{@sku}.json"))
        haml :detail
      end
    end
  end
end
