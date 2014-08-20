require 'sucker_punch'
require 'pony'

module GDC
  module Jobs
    module Email
      include SuckerPunch::Job

      def perform(form)
        log 'email_sent'
        # @type = form.type
        # @data = form.data
        # clean
        # send_mail
      end

      private

      attr_reader :data, :type

      def render_data
        result = '<table><tbody>'
        data.each_pair do |field, value|
          result += "<tr><td>#{field}:</td><td>#{value}</td></tr>"
        end
        result
      end

      def name
        @data[:name]
      end

      def email
        @data[:'e-mail']
      end

      def subject
        "#{type} from #{name}"
      end

      def clean
        data.delete :captures
        data.delete :splat
      end

      def send_mail
        Pony.mail(
          to: 'galewebform@gmail.com',
          from: email,
          subject: subject,
          html_body: render_data
        )
      end
    end
  end
end
