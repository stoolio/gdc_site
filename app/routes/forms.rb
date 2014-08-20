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
            success(signup, message: "Thanks #{params['name'].split(' ').first.capitalize}! You'll be hearing from us soon." )
          else
            failure(signup, message: DEFAULT_FAILURE_MESSAGE )
          end
        end
      end

      post '/diamonds/quote/' do
        lead = GDC::Models::Form.new('lead', params)
        if lead.save!
          success(lead, message: DEFAULT_SUCCESS_MESSAGE )
        else
          failure(lead, message: DEFAULT_FAILURE_MESSAGE )
        end
      end

      post '/contact/' do
        contact = GDC::Models::Form.new('contact', params)
        if contact.save!
          success(contact, message: DEFAULT_SUCCESS_MESSAGE )
        else
          failure(contact, message: DEFAULT_FAILURE_MESSAGE )
        end
      end

      namespace '/engagement-rings/' do
        post 'quote/' do
          ring_quote = GDC::Models::Form.new('ring_quote', params)
          if ring_quote.save!
            success( ring_quote, message: "Thanks #{params['name'].split(' ').first.capitalize}! We got your request, and we are going to have a look at it and follow up with you soon. If you'd like, you can include some images and links below if you have something specific in mind. It's completely optional though." )
          else
            failure( ring_quote, message: DEFAULT_FAILURE_MESSAGE )
          end
        end

        post 'inquiry/' do
          inquiry = GDC::Models::Form.new('inquiry', params)
          if inquiry.save!
            success( inquiry, message: DEFAULT_SUCCESS_MESSAGE )
          else
            failure( inquiry, message: DEFAULT_FAILURE_MESSAGE )
          end
        end
      end
    end
  end
end
