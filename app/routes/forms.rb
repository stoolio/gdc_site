module GDC
  module Routes
    class Forms < Base
      helpers do
        def json?
          request.accept? 'applicatoin/json'
        end
        def render_json(data)
          JSON.generate(data)
        end
        def complete(status, msg)
          if json?
            content_type 'application/json'
            render_json(msg)
          else
            redirect to("/forms/submit/#{status}")
          end
        end
        def success(msg)
          complete(:success, msg)
        end
        def failure(msg)
          complete(:failure, msg)
        end
      end

      namespace '/forms/submit' do
        get '/success' do
          markdown :diamond_request_success
        end

        get '/failure' do
          markdown :diamond_request_failure
        end
      end

      post '/diamonds/quote/?' do
        lead = GDC::Models::Form.new('lead', params)
        if lead.save!
          success(
            message: 'Thanks for your request, we will get back to you shortly'
          )
        else
          failure(
            message: 'Something went wrong, perhaps you can try to email us at <a href="mailto:sales@galediamonds.com">sales@galediamonds.com</a>.'
          )
        end
      end

      post '/contact/?' do
        contact = GDC::Models::Form.new('contact', params)
        if contact.save!
          success(
            message: "Thanks for your request, we will get back to you shortly"
          )
        else
          failure(
            message: "There was a problem with your request"
          )
        end
      end
    end
  end
end
