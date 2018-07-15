# frozen_string_literal: true

class LineItem < ApplicationRecord
  belongs_to :campaign

  validates :name, presence: true, uniqueness: { scope: :campaign_id }
  validates :booked_amount, presence: true
  validates :actual_amount, presence: true
  validates :adjustments, presence: true
  validates :campaign, presence: true

  def subtotal
    actual_amount + adjustments
  end
end