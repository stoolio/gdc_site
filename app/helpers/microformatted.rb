require 'app/helpers/microdata'

module GDC
  module Helpers
    module Microformatted
      include Microdata

      def address(prop = '')
        microdata 'PostalAddress', prop do
          span 'streetAddress',   '5 N Wabash Ave Apt 403', '<br />'
          span 'addressLocality', 'Chicago',                ', '
          span 'addressRegion',   'IL',                     ' '
          span 'postalCode',      '60602'
        end
      end

      def business(tag = 'h3')
        microdata 'JewelryStore' do
          tag tag, 'name', 'Gale Diamonds Chicago', '<br />'
          address('address')

          tag 'time', 'openingHours', 'Monday-Friday 10am-6pm'

          span 'telephone', phone_number, '<br />'
          span 'email', email

        end
      end
    end
  end
end
