module GDC
  module Routes
    class EngagementRings < Base
      helpers GDC::Helpers::Ring

      namespace '/engagement-rings' do
        get do
          @rings = GDC::Models::Ring.decorate_all
          haml :engagement_rings
        end

        get '/:model' do
          @ring = GDC::Models::Ring.find(params[:model]).decorate
          haml :ring_detail
        end
      end
    end
  end
end
