# frozen_string_literal: true

class Campaign < ApplicationRecord
  has_many :line_items

  scope :with_prefix, ->(prefix) { prefix.blank? ? all : where('name like :prefix', prefix: "#{prefix}%") }

  validates :name, presence: true, uniqueness: true

  def billable_amount
    line_items.to_a.reduce(0) { |acc, i| acc + i.billable_amount }
  end
end
