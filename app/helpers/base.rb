module GDC
  module Helpers
    module Base
      # Text Formatting
      def titlecase(string)
        String(string).split(' ').map(&:capitalize).join(' ')
      end

      def symbolize(string)
        String(string).strip.downcase.gsub(/-|\s/, '_')
      end

      # Utilities
      def deep_merge(a, b)
        a.merge(b) { |_, o, n| o.class == Hash ? o.merge(n) : n }
      end

      # Form Display
      def form(type, form_data, submit_text, extra = {})
        locals = {
          form_data: form_data,
          submit_text: submit_text
        }
        locals.merge!(extra)
        haml :"forms/#{type}", layout: :form_layout, locals: locals
      end

      def field(type)
        partial :"forms/fields/#{type}"
      end

      def email_signup(opts)
        type = opts.fetch(:type, 'list')
        return if request.cookies.key?("gdc_su_#{type.slice(0, 3)}")
        form_data = {
          id: "email-signup-#{type}",
          action: "/forms/signup/#{type}/",
          data: { key: "gdc_su_#{type.slice(0, 3)}" }
        }
        form('email_signup', form_data, opts.fetch(:submit_text, 'Sign me up!'), {
          type: type,
          location: opts.fetch(:location, 'not-provided'),
          title: opts.fetch(:title, 'Get Updates')
        })
      end

      # Links
      def link_to(link, text, options = false)
        (options ||= {})[:href] = url(link)
        partial :link, locals: { text: text, options: options }
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
        text = titlecase(name.gsub(/[-\/]/, ' ')) if text.empty?
        link_to("/#{name}/", text)
      end
    end
  end
end
