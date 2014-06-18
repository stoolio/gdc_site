module GDC
  module Models
  # Represents an engagement ring
    class Ring < Base

      class << self
        public

        attr_reader :model_index

        def all
          rings
        end

        def find(id)
          return nil unless model_index.include?(id)
          rings[model_index[id]]
        end

        private
        attr_reader :rings
        def model_index
          @model_index ||= {}
        end
        def rings
          index = 0
          @rings ||= JSON.load(open('data.json')).reduce([]) do |acc, (model,ring)|
            model_index[model] = index
            index = index + 1
            acc << Ring.new(ring)
          end
        end
      end

      public

      attr_reader :ring

      def initialize(ring)
        @ring = ring
      end

      # stupid get/fetch no logic
      def collection()
        get('collection')
      end

      def thumb_dim()
        get('thumb_dim')
      end

      def name()
        get('name')
      end

      def model
        get('model')
      end

      # for prices, price(type) uses fetch becase prices returns a hash
      def prices
        get('price')
      end

      def price(type)
        prices.fetch(type)
      end

      # slightly renamed for clarity/less typing etc
      def diamond
        get('center stone')
      end

      def style
        get('type')
      end

      def top_width
        get('width top')
      end

      def tapered_width
        get('width tapered')
      end

      # code for pictures, all based on views function
      def views
        get('views')
      end

      def total_views
        views.length
      end

      def main_view
        views.first
      end

      # catchall to avoid restarting sinatra
      # every time we find a new part we need
      # @TODO should be replaced/refactored
      def get(item)
        ring.fetch(item)
      rescue KeyError
        defaults(item)
      end

      # allows us to log when we fall back to defaults
      # as well as provide noticeable defaults for developement
      def defaults(item)
        DEV_DEFAULTS[item]
        # DEFAULTS[item]
      end

      private
      DEV_DEFAULTS = {
        "model" => "NO_MODEL",
        "name" => "NO_NAME",
        "description" => "NO_DESCRIPTION",
        "type" => "NO_TYPE",
        "main_view" => "NO_MAIN_VIEW",
        "views" => "NO_VIEWS",
        "thumb_dim" => "NO_THUMB_DIM",
        "center stone" => "NO_CENTER_STONE",
        "collection" => "NO_COLLECTION",
        "side stones" => "NO_SIDE_STONES",
        "total stones" => "NO_TOTAL_STONES",
        "round tcw" => "NO_ROUND_TCW",
        "princess tcw" => "NO_PRINCESS_TCW",
        "bg tcw" => "NO_BG_TCW",
        "colored tcw" => "NO_COLORED_TCW",
        "width top" => "NO_WIDTH_TOP",
        "width tapered" => "NO_WIDTH_TAPERED",
        "price" => "NO_PRICE",
        "tags" => "NO_TAGS"
      }

      DEFAULTS = {
        "model" => "",
        "name" => "",
        "description" => "",
        "type" => "",
        "main_view" => "",
        "views" => "",
        "thumb_dim" => "",
        "center stone" => "",
        "collection" => "",
        "side stones" => "",
        "total stones" => "",
        "round tcw" => "",
        "princess tcw" => "",
        "bg tcw" => "",
        "colored tcw" => "",
        "width top" => "",
        "width tapered" => "",
        "price" => "",
        "tags" => ""
      }
    end
  end
end
