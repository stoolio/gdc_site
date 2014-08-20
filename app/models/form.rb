module GDC
  module Models
    class Form < Base
      attr_reader :type, :data, :file

      def initialize(type, data)
        @type = type
        @data = data
      end

      def save!
        json_data = JSON.generate(data)
        folder = get_dir
        @file = %Q{#{folder}/#{Time.now.strftime "%F-%T"}.json}.gsub(':','_')
        byte_size = json_data.bytesize
        bytes_written = File.write(file, json_data)
        byte_size == bytes_written ? file : false
      end

      private

      def get_dir
        folder_name = %Q{form-data/#{type}/}
        Dir.mkdir(folder_name) unless Dir.exist?(folder_name)
        folder_name
      end
    end
  end
end
