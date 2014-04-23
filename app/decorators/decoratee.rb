module GDC
  module Decorators
    module Decoratee
      def decorate
        decorator.new(self)
      end
      def decorator
        @decorator ||= GDC::Decorators.const_get(decorator_class)
      end
      def decorator_class
        @decorator_class ||= self.class.to_s.split('::').last + 'Decorator'
      end
    end
  end
end
