require 'sinatra\base'

module GDC
  # Universal Helpers, include with `helpers Helpers`
  module BaseHelpers
    def partial(template, options = {})
      template = ('_' + template).to_sym
      haml template, options.merge!(layout: false)
    end

    # Renders a collection of objects using a partial
    # @template: string representing partial (without _)
    # @collection: hash of objects to render
    # each object is passed to template in locals named the same as template
    # @uses partial
    def partials(template, collection)
      collection.keys.each do |i|
        partial(template, locals: { template.to_sym => collection[i] })
      end
    end

    def breadcrumbs(base = { Home: '/' })
      Breadcrumbs.new(base)
    end

    # Generates breadcrumbs
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
  # Helpers for engagement ring pages
  module RingHelpers
    def to_price(number)
      '$' + number.to_s.reverse.gsub(/(\d{3})(?=\d)/, '\\1,').reverse
    end

    def tagify(item)
      item.downcase.strip.gsub(' ', '-')
    end
  end
end
