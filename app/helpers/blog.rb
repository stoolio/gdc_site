module GDC
  module Helpers
    module Blog
      def nice_title(title)
        titlecase(title.gsub('-', ' '))
      end
    end
  end
end
