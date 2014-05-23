module GDC
  module Helpers
    module Education
      PATH = 'app/views/education/'
      def education(page)
        haml :'education/layout' do
          haml page
        end
      end

      def categories(local_path = '')
        path = PATH + local_path
        Dir.entries(path).select do |d|
          Dir.exist?(path + d) && !d.include?('.')
        end
      end

      def list(local_path = '', compare_func)
        path = PATH + local_path
        Dir.entries(path).select do |entry|
          compare_func.call(path + entry) && !entry.include('.')
        end
      end

      def page_exist?(file, ext = '.md')
        File.exist?(PATH + file + ext)
      end
    end
  end
end
