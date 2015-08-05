module GDC
  module Routes
    class Blog < Base
      PER_PAGE = 4
      helpers GDC::Helpers::Blog

      get '/blog/' do
        @page = 1
        @posts, @pages = GDC::Models::Post.for_page(@page, PER_PAGE)
        haml :index
      end

      get '/blog/page/1/' do
        redirect '/blog/', 301
      end

      get '/blog/page/:num/' do
        @page = params[:num].to_i
        @posts, @pages = GDC::Models::Post.for_page(@page, PER_PAGE)
        haml :index
      end

      get '/blog/:post/' do
        @post = params[:post]
        @file = GDC::Models::Post.by_title(@post)
        halt 404 unless @file
        haml :post
      end
    end
  end
end
