module GDC
  module Helpers
  # Generates breadcrumbs
    module Breadcrumbs
      def breadcrumbs(base = { Home: '/' })
        Breadcrumbs.new(base)
      end

      # class to save state for breadcrumbs
      class Breadcrumbs
        def initialize(base)
          @crumbs = {}
          add(base)
        end

        def add(crumb)
          crumb.each_pair { |k, v| @crumbs[k] = v }
        end

        def render
          @crumbs.reduce("<nav class='breadcrumbs'>") do |s, (k, v)|
            s + "<a href='#{v}' >#{k}</a>"
          end + '</nav>'
        end
      end
    end
  end
end
