module GDC
  module Helpers
    module Base
      def titlecase(string)
        String(string).split(' ').map(&:capitalize).join(' ')
      end

      def symbolize(string)
        String(string).strip.downcase.gsub(/-|\s/,'_')
      end
    end
  end
end
