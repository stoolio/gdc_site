module GDC
  module Helpers
    module SiteMap
      SITE_MAP = {
        home: {
          url: '/'
        },
        engagement_rings: {
          url: '/engagement-rings/',
          ring: {
            url: ':model/'
          }
        },
        diamonds: {
          url: '/diamonds/',
          quote: {
            url: 'quote/'
          }
        },
        education: {
          url: '/education',
          category: {
            diamonds: {
              url: 'diamonds/',
              topics: {
                url: ':topic/'
              }
            },
            ring: {
              url: 'rings/',
              topics: {
                url: ':topic/'
              }
            }
          }
        },
        about: {
          url: '/about/'
        },
        policies: {
          url: '/policies/',
          # Return, Shipping, Privacy, Terms
          policies: {
            url: ':policy/'
          }
        },
        contact: {
          url: '/contact/'
        }
      }
    end
  end
end
