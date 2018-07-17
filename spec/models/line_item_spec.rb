# frozen_string_literal: true

require 'rails_helper'

describe LineItem, type: :model do
  describe 'validations' do
    subject { build(:line_item) }

    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_uniqueness_of(:name).scoped_to(:campaign_id) }
    it { is_expected.to validate_presence_of(:booked_amount) }
    it { is_expected.to validate_presence_of(:actual_amount) }
    it { is_expected.to validate_presence_of(:adjustments) }
    it { is_expected.to validate_presence_of(:campaign) }
  end

  describe '#billable_amount' do
    let(:line_item) { build(:line_item, actual_amount: 100, adjustments: -10) }

    it 'equals the actual amount plus any adjustments' do
      expect(line_item.billable_amount).to eq(90)
    end
  end
end
