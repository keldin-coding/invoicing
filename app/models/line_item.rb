# frozen_string_literal: true

class LineItem < ApplicationRecord
  belongs_to :campaign

  validates :name, presence: true, uniqueness: { scope: :campaign_id }
  validates :booked_amount, presence: true, numericality: true
  validates :actual_amount, presence: true, numericality: true
  validates :adjustments, presence: true, numericality: true
  validates :campaign, presence: true

  after_find :readonly!, if: :reviewed?

  def billable_amount
    actual_amount + adjustments
  end
end
