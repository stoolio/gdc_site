module GDC
  module Routes
    class Education < Base
      helpers GDC::Helpers::Education

      namespace '/education/' do
        get do
          education :home
        end

        namespace ':category/' do

          before do
            @category = params[:category]
          end

          get do
            education :"#{@category}"
          end

          get ':page/' do
            @page = params[:page]
            @file = symbolize(@category + '/' + @page)
            if page_exist?(@file)
              education :"page"
            else
              redirect to("/education/#{@category}/")
            end
          end
        end
      end
    end
  end
end
