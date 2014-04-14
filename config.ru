require 'bundler/setup'

require './application.rb'

map('/') { run GDC::Application }
