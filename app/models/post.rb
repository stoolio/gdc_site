module GDC
  module Models
    class Post < Base
      module Config
        class << self
          attr_reader :dir, :per_page
          attr_accessor :ext

          def dir=(str)
            fail StandardError, 'Tried to set GDC::Models::Post::Config.dir to a non directory value' unless Dir.exist?(str)
            @dir = str
          end

          def per_page=(val)
            val = val.to_i
            val = val == 0 ? 1 : val
            @per_page = val
          end
        end

        # defaults
        @dir = 'db/posts'
        @ext = '.md'
        @per_page = 3
      end

      class << self
        public

        attr_reader :title, :pretty_title, :filename

        def all
          Dir["#{dir}/*#{ext}"].map do |file|
            get_filename(file).split('-').drop(1).join('-')
          end
        end

        def by_title(title)
          file = Dir["#{dir}/*-#{title}#{ext}"].first
          return false unless File.exist?(file)
          get_filename(file)
        end

        def for_page(page)
          posts = all
          len = posts.length
          [
            posts.reverse.slice((page - 1) * per_page, page * per_page),
            (Float(len) / per_page).ceil
          ]
        end

        def count
          all.length
        end

        private

        Config.instance_variables.each do |var|
          meth = var.to_s.gsub('@','').to_sym
          define_method meth do
            Config.instance_variable_get(var)
          end
        end

        def get_filename(file)
          /[\w-]*\.md/.match(file).to_s.gsub('.md', '')
        end
      end
    end
  end
end
