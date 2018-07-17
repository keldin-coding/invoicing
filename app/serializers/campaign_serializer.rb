# frozen_string_literal: true

class CampaignSerializer < ApplicationSerializer
  def as_json
    {
      id: record.id,
      name: record.name,
      lineItems: record.line_items.map(&:as_json),
      billableAmount: record.billable_amount.round(4)
    }
  end
end
