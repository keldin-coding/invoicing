# frozen_string_literal: true

class CampaignsController < ApplicationController
  PAGE_SIZE = 10

  def index
    campaigns = campaign_query.limit(PAGE_SIZE).offset(offset)

    render json: {
      campaigns: campaigns.map(&:as_json),
      moreResults: more_results?,
      grandTotal: grand_total
    }
  end

  def update
    unless params[:reviewed]
      render json: { error: 'Unknown update parameter' }, status: 400
      return
    end

    campaign = Campaign.find(params[:id])
    campaign.line_items.update_all(reviewed: true)

    render json: campaign
  end

  private

  def page_number
    num = params[:page].to_i

    !num.positive? ? 1 : num
  end

  def offset
    (page_number - 1) * PAGE_SIZE
  end

  def campaign_query
    Campaign.includes(:line_items).with_prefix(params[:campaign_name].to_s)
  end

  def grand_total
    campaign_query.reduce(0) { |acc, c| acc + c.billable_amount }.round(4)
  end

  def more_results?
    campaign_query.offset(offset + PAGE_SIZE).exists?
  end
end
