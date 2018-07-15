FactoryBot.define do
  factory :line_item do
    name 'Foobar'
    booked_amount 100.1111111
    actual_amount 123.1212121
    adjustments 67.8989898

    factory :line_item_with_campaign do
      campaign { build(:campaign) }
    end
  end
end