module GDC
  module Models
  # Represents an engagement ring
    class Ring < Base
      attr_reader :ring

      def initialize(ring)
        @ring = ring
      end

      def collection()
        ring.fetch('collection')
      end

      def thumb_dim()
        ring.fetch('thumb_dim')
      end

      def price(type)
        ring.fetch('price').fetch(type)
      end

      def name()
        ring.fetch('name', '')
      end

      def diamond
        ring.fetch('center stone', 'Unknown')
      end

      def style
        ring.fetch('type', 'Unknown')
      end

      def total_views
        ring.fetch('views').length
      end

      def view
        ring.fetch('views', []).first
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
