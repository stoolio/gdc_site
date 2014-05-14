module GDC
  module Routes
    class Education < Base
      helpers do
        def education(page)
          haml :education_layout do
            haml page
          end
        end

        def page_exist?(file)
          File.exist?('app/views/education/' + file + '.md')
        end
      end

      namespace '/education' do
        get '/?' do
          education :home
        end

        namespace '/:category' do

          before do
            @category = params[:category]
          end

          get do
            education :category
          end

          get '/' do
            redirect to("education/#{@category}")
          end

          get '/:page/?' do
            @page = params[:page]
            @file = symbolize(@category + '/_' + @page)
            if page_exist?(@file)
              education :page
            else
              redirect to("/education/#{@category}")
            end
          end
        end
      end
    end
  end
end
