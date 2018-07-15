# frozen_string_literal: true

class LineItemSerializer < ApplicationSerializer
  def as_json
    {
      id: record.id,
      name: record.name,
      bookedAmount: record.booked_amount.round(4),
      actualAmount: record.actual_amount.round(4),
      adjustments: record.adjustments.round(4),
      billableAmount: record.billable_amount.round(4)
    }
  end
end