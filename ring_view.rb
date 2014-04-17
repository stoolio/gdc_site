module GDC
  # ViewModel for Engagement Rings
  class RingView
    attr_reader :ring

    include GDC::RingHelpers

    def initialize(ring)
      @ring = ring
    end

    def diamond
      ring.fetch('center stone', 'Unknown')
    end

    def raw_price
      return ring['price']['18kt'] if ring['price']['14kt'] == 'N/A'
      ring['price']['14kt']
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
      ring['width top']
    end

    def tapered_width
      ring['width tapered']
    end

    def tapered?
      tapered_width == top_width
    end
  end
end
