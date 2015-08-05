module GDC
  module Routes
    class Utility < Base
      # redirects any routes not ending in slashes to a slashed route
      # Ex:
      # /foo/bar will redirect to /foo/bar/
      # /baz will redirect to /baz/
      get %r{(/.*[^\/])$} do
        redirect to("#{params[:captures].first}/"), 301
      end

      not_found do
        haml :'404'
      end

      get '/404/' do
        haml :'404'
      end
    end
  end
end
