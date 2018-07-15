# frozen_string_literal: true

class LineItemSerializer < ApplicationSerializer
  def as_json
    {
      id: record.id,
      name: record.name,
      campaignName: record.campaign.name,
      bookedAmount: record.booked_amount.round(4),
      actualAmount: record.actual_amount.round(4),
      adjustments: record.adjustments.round(4),
      subtotal: record.subtotal.round(4)
    }
  end
end