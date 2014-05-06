module GDC
  module Routes
    class Forms < Base
      get '/diamond-quote/?' do
        haml :diamond_quote
      end

      post '/diamond-quote/?' do
        lead_data = JSON.generate(params)
        filename = %Q/#{Time.now.strftime "%F-%T"}-#{params['name']}/
        byte_size = lead_data.bytesize
        bytes_written = File.write(filename, lead_data)
        if byte_size == bytes_written
          "Thanks for your request, we will get back to you shortly"
        else
          "There was a problem with your request"
        end
      end

      get '/contact/?' do
        haml :contact
      end
    end
  end
end
