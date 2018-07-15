# frozen_string_literal: true

require 'rails_helper'

describe Campaign, type: :model do
  describe 'validations' do
    subject { build(:campaign) }

    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_uniqueness_of(:name) }
  end

  describe '#billable_amount' do
    it "is equal to the billable amount of each of the campaign's line items" do
      campaign = create(:campaign)

      first = create(:line_item, campaign: campaign)
      second = create(:line_item)
      third = create(:line_item, campaign: campaign)

      expect(campaign.billable_amount).to eq(first.billable_amount + third.billable_amount)
    end
  end
end