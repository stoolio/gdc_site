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

      def sareen(collection, name, type = :thumb)
        if type == :thumb
          is_thumb = '/thumb'
        else
          is_thumb = ''
        end
        "/img/sareen/#{tagify(collection)}#{is_thumb}/#{name}"
      end
    end
  end
end
