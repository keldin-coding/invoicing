# frozen_string_literal: true

FactoryBot.define do
  factory :line_item do
    name { Faker::Lorem.words(4).sample(3).join(' ') }
    booked_amount { Faker::Number.decimal(rand(1..4), 6) }
    actual_amount { Faker::Number.decimal(rand(1..4), 6) }
    adjustments { Faker::Number.decimal(rand(1..4), 6) }
    campaign { build(:campaign) }
  end
end