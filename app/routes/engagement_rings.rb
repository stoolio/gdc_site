module GDC
  module Routes
    class EngagementRings < Base
      namespace '/engagement-rings' do
        helpers GDC::Helpers::Ring

        get do
          rings = JSON.load(open('data.json'))
          haml :engagement_rings, locals: { rings: rings }
        end

        get '/temp' do
          rings = JSON.load(open('test.json'))
          haml :engagement_rings_test, layout: :layout_test, locals: { rings: rings }
        end
      end
    end
  end
end
