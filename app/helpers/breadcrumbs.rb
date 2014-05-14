module GDC
  module Helpers
  # Generates breadcrumbs
    module Breadcrumbs
      def crumbs
        @crumbs ||= { Home: url('/') }
      end

      def crumb
        add_crumb(@title.gsub('-',' '), @env['PATH_INFO'])
      end

      def add_crumb(title, path)
        crumbs[title] = url(path)
      end

      def breadcrumbs
        l = crumbs.length
        i = 0
        crumbs.reduce("<nav class='breadcrumbs'>") do |s, (k, v)|
          i = i + 1
          s + "<a href='#{v}'" + (i == l ? "class='current'" : "") +" >#{k}</a>"
        end + '</nav>'
      end
    end
  end
end
