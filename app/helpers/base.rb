module GDC
  module Helpers
    module Base
      # REFERENCE_SITE_MAP = {
      #   home: {
      #     url: '/'
      #   },
      #   engagement_rings: {},
      #   diamonds: {},
      #   education: {},
      #   about: {},
      #   policies: {},
      #   contact: {}
      # }

      def titlecase(string)
        String(string).split(' ').map(&:capitalize).join(' ')
      end

      def symbolize(string)
        String(string).strip.downcase.gsub(/-|\s/,'_')
      end

      def deep_merge(a,b)
        a.merge(b) { |k,o,n| o.class == Hash ? o.merge(n) : n }
      end

      def email_signup(opts)
        type = opts.fetch(:type, 'list')
        return if request.cookies.key?("gdc_su_#{type.slice(0,3)}")
        partial :email_signup, locals: {
          type: opts.fetch(:type, 'list'),
          location: opts.fetch(:location, 'not-provided'),
          title: opts.fetch(:title, 'Get Updates'),
          submit_text: opts.fetch(:submit_text, 'Sign me up!')
        }
      end

      def link_to(link, text, options = false)
        (options ||= {})[:href] = url(link)
        partial :link, locals: {text: text, options: options}
        # "<a href=\"#{url(link)}\">#{text}</a>"
      end

      def phone_number(text = '312-920-0075')
        link_to('tel:+1-312-920-0075', text)
      end

      def email(person = 'sales', text = '*@galediamonds.com')
        text.gsub!('*', person) if text.include?('*')
        link_to("mailto:#{person}@galediamonds", text)
      end

      def page_link(name, text = '')
        text = titlecase(name.gsub(%r{[-/]},' ')) if text.empty?
        link_to("/#{name}/", text)
      end
    end
  end
end
