module GDC
  module Decorators
    # ViewModel for Engagement Rings
    class RingDecorator < Base
      include GDC::Helpers::Ring

      def from_price
        price('14kt') == 'N/A' ? price('18kt') : price('14kt')
      end

      def display_price
        to_price(from_price)
      end

      def width
        dims[0]
      end

      def height
        dims[1]
      end

      def dims
        @dims ||= thumb_dim
        @dims
      end

      def tcw
        ['round','princess','bg','colored'].reduce(0) do |acc, type|
          acc + get("#{type} tcw").to_f
        end
      end

      def all_side_stones
        get('side stones').split(' ').map(&:capitalize).join(' & ')
      end

      def tapered?
        tapered_width == top_width
      end
    end
  end
end
