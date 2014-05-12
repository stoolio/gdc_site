module GDC
  module Helpers
    module Menu
      PATHREGEX = %r{^(/[\w-]*)}

      MENU = {
        'Home' => {
          url: '/',
          dropdown: false
        },
        'Engagement Rings' => {
          url: '/engagement-rings',
          dropdown: {
            'Request a Quote' => '/quote'
          }
        },
        'Diamonds' => {
          url: '/diamonds',
          dropdown: {
            'Request a Quote' => '/quote'
          }
        },
        'Education' => {
          url: '/education',
          dropdown: {
            'All About Diamonds' => '/diamonds',
            'Learn About Rings' => '/rings'
          }
        },
        'About' => {
          url: '/about',
          dropdown: false
        },
        'Contact' => {
          url: '/contact',
          dropdown: false
        }
      }

      def active?(path)
        match = PATHREGEX.match(request.path)
        match[1] == path ? 'active' : ''
      end

      def render_menu
        partial :menu_item, locals: { menu: MENU }
      end
    end
  end
end
