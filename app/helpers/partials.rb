module GDC
  module Helpers
    module Partials
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
    end
  end
end
