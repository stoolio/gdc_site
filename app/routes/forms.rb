# success: 'Thanks for your request, we will get back to you shortly'
# failure: 'Something went wrong, perhaps you can try to email us at <a href="mailto:sales@galediamonds.com">sales@galediamonds.com</a>.'
module GDC
  module Routes
    class Forms < Base
      helpers GDC::Helpers::Form

      namespace '/forms' do
        namespace '/submit' do
          post do
            type = params.delete(:type)
            form = GDC::Models::Form.new(type, params)
            if form.save!
              success(
                message: markdown(:form_submit_success)
              )
            else
              failure(
                message: markdown(:form_submit_failure)
              )
            end
          end

          get '/success' do
            markdown :form_submit_success
          end

          get '/failure' do
            markdown :form_submit_failure
          end
        end
      end

      post '/diamonds/quote' do
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

      post '/contact' do
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
