module Microdata
  def microdata(type, prop = '', &block)
    Microdata.new(type, prop, &block).result
  end

  class Microdata
    attr_reader :output

    def initialize(type, prop, &block)
      @level = 0
      @output = ''
      scope type, prop, &block
    end

    def output(str)
      @output += "#{str}\n"
    end

    def result
      @output
    end

    def level
      ' '*(@level*2)
    end

    def span(prop, text, post = '')
      tag('span', prop, text, post)
    end

    def a(prop, text, post = '')
      tag('a', prop, text, post)
    end

    def scope(scope, property = '', &block)
      output("#{level}<div#{prop(property)} itemscope itemtype='http://schema.org/#{scope}'>")
      @level += 1
      instance_eval &block
      @level -= 1
      output("#{level}</div>")
    end

    def prop(prop = '')
      prop.empty? ? '' : " itemprop='#{prop}'"
    end

    def tag(tag, property, text, post = '')
      output("#{level}<#{tag}#{prop(property)}'>#{text}</#{tag}>#{post}")
    end
  end
end
