module GDC
  module Helpers
    module Form
      def json?
        request.accept? 'application/json'
      end
      def render_json(data)
        JSON.generate(data)
      end
      def complete(status, msg)
        if json?
          content_type 'application/json'
          render_json(msg)
        else
          redirect to("/forms/submit/#{status}")
        end
      end
      def success(msg)
        complete(:success, msg)
      end
      def failure(msg)
        complete(:failure, msg)
      end
    end
  end
end
