# frozen_string_literal: true

class LineItemSerializer < ApplicationSerializer
  def as_json
    {
      id: record.id,
      name: record.name,
      bookedAmount: booked_amount,
      actualAmount: actual_amount,
      adjustments: adjustments,
      billableAmount: billable_amount
    }
  end

  private

  def booked_amount
    record.booked_amount.round(4)
  end

  def actual_amount
    record.actual_amount.round(4)
  end

  def adjustments
    record.adjustments.round(4)
  end

  def billable_amount
    record.billable_amount.round(4)
  end
end
