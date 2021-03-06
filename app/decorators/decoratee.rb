module GDC
  module Decorators
    module Decoratee
      def self.included(base)
        base.extend(ClassMethods)
      end

      module ClassMethods
        def decorate_all
          self.all.map { |o| o.decorate }
        end
      end

      def decorate
        decorator.new(self)
      rescue NameError
        self
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
