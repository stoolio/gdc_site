module GDC
  module Helpers
  # Generates breadcrumbs
    module Breadcrumbs
      @crumb = false

      def autocrumb(last_crumb = false)
        crumbs = process_path(env['PATH_INFO'], last_crumb)
        render_crumbs(crumbs)
      end

      private

      def process_path(path, last_crumb = false)
        return {'Home' => '/'} if path == '/'
        chunks = path.split('/')
        titles = pretty_title(chunks)
        titles.tap(&:pop).push(last_crumb) if last_crumb
        urls = expand_urls(chunks)
        Hash[titles.zip(urls)]
      end

      def expand_urls(path_parts)
        urls = []
        path_parts.each_with_index do |part, i|
          url = path_parts.slice(0,i+1).join('/')
          url = '/' if url.empty?
          urls << url
        end
        urls
      end

      def pretty_title(path_parts)
        path_parts.map do |part|
          next 'Home' if part.empty?
          part.gsub('-',' ').capitalize
        end
      end

      def render_crumbs(crumbs)
        l = crumbs.length
        i = 0
        crumbs.reduce("<nav class='breadcrumbs'>") do |s, (k, v)|
          i += 1
          s + "<a href='#{v}'" + (i == l ? "class='current'" : "") +" >#{k}</a>"
        end + '</nav>'
      end
    end
  end
end
