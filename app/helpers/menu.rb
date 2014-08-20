module GDC
  module Helpers
    module Menu
      PATHREGEX = %r{^(/[\w-]*/?)}

      MENU = {
        'Home' => {
          url: '/',
          dropdown: false
        },
        'Engagement Rings' => {
          url: '/engagement-rings/',
          dropdown: {
            'Custom Design Process' => '/engagement-rings/custom/'
          }
          #dropdown: {
          #  'Request a Quote' => '/engagement-rings/quote/'
          #}
        },
        'Diamonds' => {
          url: '/diamonds/',
          dropdown: {
            'Request a Quote' => '/diamonds/quote/'
          }
        },
        'Specials' => {
          url: '/specials/',
          dropdown: false
        },
        # 'Education' => {
        #   url: '/education/',
        #   dropdown: {
        #     'All About Diamonds' => '/education/diamonds/',
        #     'Learn About Rings' => '/education/rings/'
        #   }
        # },
        'Blog' => {
          url: '/blog/',
          dropdown: false
        },
        'About' => {
          url: '/about/',
          dropdown: {
            'Policies' => '/policies/'
          }
        },
        'Contact' => {
          url: '/contact/',
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
