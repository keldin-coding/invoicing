# frozen_string_literal: true

class CampaignsController < ApplicationController
  def index
    campaigns = Campaign.includes(:line_items).with_prefix(params[:campaign_name].to_s)

    render json: Oj.dump(campaigns.map(&:as_json))
  end
end