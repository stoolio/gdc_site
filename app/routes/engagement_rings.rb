module GDC
  module Routes
    class EngagementRings < Base
      helpers GDC::Helpers::Ring

      namespace '/engagement-rings/' do
        get do
          @rings = GDC::Models::Ring.decorate_all
          haml :engagement_rings
        end

        get 'custom/' do
          haml :custom_process
        end

        #get 'quote/' do
        #  haml :custom_quote
        #end

        get ':model/' do
          ring = GDC::Models::Ring.find(params[:model])
          redirect '/engagement-rings/', 404 if ring.nil?
          @ring = ring.decorate
          haml :ring_detail
        end
      end
    end
  end
end
