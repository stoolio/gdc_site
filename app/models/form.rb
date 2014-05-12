module GDC
  module Models
    class Form < Base
      attr_reader :type, :data

      def initialize(type, data)
        @type = type
        @data = data
      end

      def save!
        json_data = JSON.generate(data)
        file = %Q{forms/#{type}/#{Time.now.strftime "%F-%T"}.json}.gsub(':','_')
        byte_size = json_data.bytesize
        bytes_written = File.write(file, json_data)
        byte_size == bytes_written ? true : false
      end
    end
  end
end
