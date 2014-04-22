module GDC
  module Helpers
    # Helpers for engagement ring pages
    module Ring
      def to_price(number)
        '$' + number.to_s.reverse.gsub(/(\d{3})(?=\d)/, '\\1,').reverse
      end

      def tagify(item)
        item.downcase.strip.gsub("'", '').gsub(' ', '-')
      end

      def classify(items)
        Array(items).map(&:downcase).map(&:strip)
          .reduce([]) { |a, e| a << e.gsub("'", '').gsub(' ', '-') }
      end

      def titlecase(string)
        String(string).split(' ').map(&:capitalize).join(' ')
      end
    end
  end
end
