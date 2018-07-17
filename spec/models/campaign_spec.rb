# frozen_string_literal: true

require 'rails_helper'

describe Campaign, type: :model do
  describe 'validations' do
    subject { build(:campaign) }

    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_uniqueness_of(:name) }
  end

  describe '.with_prefix' do
    subject { described_class.with_prefix(prefix).to_a }

    let(:prefix) { 'ab' }
    let!(:campaign_1) { create(:campaign, name: 'xylophone') }
    let!(:campaign_2) { create(:campaign, name: 'abba') }

    context 'given nil for the prefix' do
      let(:prefix) { nil }

      it 'returns all campaigns' do
        expect(subject).to eq([campaign_1, campaign_2])
      end
    end

    context 'given an empty string for the prefix' do
      let(:prefix) { '' }

      it 'returns all campaigns' do
        expect(subject).to eq([campaign_1, campaign_2])
      end
    end

    it 'filters down to campaigns that start with the prefix' do
      expect(subject).to eq([campaign_2])
    end
  end

  describe '#billable_amount' do
    it "is equal to the billable amount of each of the campaign's line items" do
      campaign = create(:campaign)

      first = create(:line_item, campaign: campaign)
      second = create(:line_item, campaign: campaign)
      create(:line_item)

      expect(campaign.billable_amount).to eq(first.billable_amount + second.billable_amount)
    end
  end
end
