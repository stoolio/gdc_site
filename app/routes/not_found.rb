module GDC
  module Routes
    class NotFound < Base
      not_found do
        haml :'404'
      end
      get '/404/' do
        haml :'404'
      end
    end
  end
end
