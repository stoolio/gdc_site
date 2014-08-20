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
        total = %w[round princess bg colored].reduce(0) do |acc, type|
          acc + get("#{type} tcw").to_f
        end
        format("%.2f", total)
      end

      def all_side_stones
        temp = get('side stones').split(' ').map do |stone|
          stone.split('-').map(&:capitalize).join(' ')
        end
        if temp.length > 2
          [temp.slice(0, temp.length - 1).join(', '), temp.last].join(' & ')
        elsif temp.length == 2
          temp.join(' & ')
        else
          temp.join('')
        end
      end

      def tapered?
        tapered_width == top_width
      end
    end
  end
end
