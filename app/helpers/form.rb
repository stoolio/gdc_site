module GDC
  module Helpers
    module Form
      DEFAULT_SUCCESS_MESSAGE = 'Thanks for your request, we will get back to you shortly'
      DEFAULT_FAILURE_MESSAGE = 'Something went wrong, perhaps you can try to email us at <a href="mailto:sales@galediamonds.com">sales@galediamonds.com</a>.'

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

      def success(_form, msg)
        # GDC::Jobs::Email.new.async.perform(form)
        complete(:success, msg)
      end

      def failure(_form, msg)
        complete(:failure, msg)
      end
    end
  end
end
