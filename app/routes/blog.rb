module GDC
  module Routes
    class Blog < Base
      POSTS_PER_PAGE = 3
      helpers do
        def load_posts(page)
          files = Dir['db/posts/*.md'].map do |file|
            get_filename(file).split('-').drop(1).join('-')
          end
          num = files.length
          #  files.sort_by do |file|
          #    file.split('-').shift
          #  end
          # files.reverse.slice((page-1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE)
          [files.reverse.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE), (Float(num) / POSTS_PER_PAGE).ceil]
        end

        def get_filename(file)
          /[\w-]*\.md/.match(file).to_s.gsub('.md', '')
        end

        def nice_title(title)
          titlecase(title.gsub('-', ' '))
        end
      end

      get '/blog/' do
        @page = 1
        @posts, @pages = load_posts(@page)
        haml :index
      end

      get '/blog/page/1/' do
        redirect '/blog/', 301
      end

      get '/blog/page/:num/' do
        @page = params[:num].to_i
        @posts, @pages = load_posts(@page)
        haml :index
      end

      get '/blog/:post/' do
        @post = params[:post]
        @file = Dir["db/posts/*-#{@post}.md"].first
        halt 404 unless File.exist?(@file)
        @file = get_filename(@file)
        haml :post
      end
    end
  end
end
