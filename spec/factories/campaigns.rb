# frozen_string_literal: true

FactoryBot.define do
  factory :campaign do
    name { Faker::Lorem.words(3).sample(2).join(' ') }
  end
end