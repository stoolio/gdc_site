module GDC
  module Decorators
    # ViewModel for Engagement Rings
    class Ring
      attr_reader :ring

      include GDC::Helpers::Ring

      def initialize(ring)
        @ring = ring
      end

      def diamond
        ring.fetch('center stone', 'Unknown')
      end

      def raw_price
        ring['price']['14kt'] == 'N/A' ? ring['price']['18kt'] : ring['price']['14kt']
      end

      def price
        to_price(raw_price)
      end

      def style
        ring.fetch('type', 'Unknown')
      end

      def view
        ring.fetch('views', []).last
      end

      def collection
        ring.fetch('collection', 'Unknown')
      end

      def top_width
        ring.fetch('width top', '-')
      end

      def tapered_width
        ring.fetch('width tapered', '-')
      end

      def tapered?
        tapered_width == top_width
      end
    end
  end
end
