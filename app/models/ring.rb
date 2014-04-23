module GDC
  module Models
  # Represents an engagement ring
    class Ring < Base
      attr_reader :ring

      def initialize(ring)
        @ring = ring
      end

      def price(type)
        ring.fetch('price').fetch(type)
      end

      def diamond
        ring.fetch('center stone', 'Unknown')
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
    end
  end
end
