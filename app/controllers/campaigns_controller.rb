# frozen_string_literal: true

class CampaignsController < ApplicationController
  def index
    campaigns = Campaign.includes(:line_items)

    render json: Oj.dump(campaigns.map(&:as_json))
  end
end