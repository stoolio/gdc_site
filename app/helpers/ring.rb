module GDC
  module Helpers
    module Ring
      def to_tag(item)
        item.downcase.strip.gsub("'", '').gsub(' ', '-')
      end

      def to_price(number)
        '$' + number.to_s.reverse.gsub(/(\d{3})(?=\d)/, '\\1,').reverse
      end

      def classify(items)
        Array(items).map(&:downcase).map(&:strip)
          .reduce([]) { |a, e| a << e.gsub("'", '').gsub(' ', '-') }
      end

      def image(collection, name, type = :thumb)
        if type == :thumb
          is_thumb = '/thumb'
        else
          is_thumb = ''
        end
        "/img/rings/#{to_tag(collection)}#{is_thumb}/#{name}"
      end
    end
  end
end
