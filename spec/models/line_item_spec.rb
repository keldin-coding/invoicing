require 'rails_helper'

describe LineItem, type: :model do
  describe 'validations' do
    subject { build(:line_item) }

    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_uniqueness_of(:name).scoped_to(:campaign_id) }
    it { is_expected.to validate_presence_of(:booked_amount) }
    it { is_expected.to validate_presence_of(:actual_amount) }
    it { is_expected.to validate_presence_of(:adjustments) }
  end
end