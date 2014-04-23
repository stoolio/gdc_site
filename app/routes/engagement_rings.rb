module GDC
  module Routes
    class EngagementRings < Base
      namespace '/engagement-rings' do
        helpers GDC::Helpers::Ring

        get do
          rings = JSON.load(open('data.json')).reduce([]) do |acc, (model,ring)|
            acc << GDC::Models::Ring.new(ring).decorate
          end
          haml :engagement_rings, locals: { rings: rings }
        end
      end
    end
  end
end
