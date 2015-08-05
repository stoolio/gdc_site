module GDC
  module Models
    class Special
      class << self
        def all
          files = Dir['db/specials/*.json']
          files.map do |file|
            JSON.load(open(file))
          end
        end

        def find(sku)
          JSON.load(open("db/specials/#{sku}.json"))
        end
      end
    end
  end
end
