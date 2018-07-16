# frozen_string_literal: true

class CampaignsController < ApplicationController
  PAGE_SIZE = 10

  def index
    campaigns = Campaign.includes(:line_items).with_prefix(params[:campaign_name].to_s).limit(PAGE_SIZE).offset(offset)

    render json: {
      campaigns: campaigns.map(&:as_json),
      moreResults: Campaign.offset(offset + PAGE_SIZE).exists?
    }
  end

  private

  def page_number
    num = params[:page].to_i

    !num.positive? ? 1 : num
  end

  def offset
    (page_number - 1) * PAGE_SIZE
  end
end