module GDC
  module Routes
    class Forms < Base
      helpers GDC::Helpers::Form

      # Only for non-js form submit
      namespace '/forms/' do
        namespace 'submit/' do
          get 'success/' do
            markdown :form_submit_success
          end

          get 'failure/' do
            markdown :form_submit_failure
          end
        end

        post 'signup/:type/' do
          signup = GDC::Models::Form.new('signup', params)
          if signup.save!
            success( message: "Thanks #{params['name'].split(' ').first.capitalize}! You'll be hearing from us soon." )
          else
            failure( message: DEFAULT_FAILURE_MESSAGE )
          end
        end
      end

      namespace '/diamonds/quote/' do
        get do
          haml :diamond_quote
        end

        post do
          lead = GDC::Models::Form.new('lead', params)
          if lead.save!
            success( message: DEFAULT_SUCCESS_MESSAGE )
          else
            failure( message: DEFAULT_FAILURE_MESSAGE )
          end
        end
      end

      get '/contact/' do
        haml :contact
      end

      post '/contact/' do
        contact = GDC::Models::Form.new('contact', params)
        if contact.save!
          success( message: DEFAULT_SUCCESS_MESSAGE )
        else
          failure( message: DEFAULT_FAILURE_MESSAGE )
        end
      end

      post '/engagement-rings/:model/' do
        inquiry = GDC::Models::Form.new('inquiry', params)
        if inquiry.save!
          success( message: DEFAULT_SUCCESS_MESSAGE )
        else
          failure( message: DEFAULT_FAILURE_MESSAGE )
        end
      end
    end
  end
end
