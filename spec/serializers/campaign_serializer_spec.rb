# frozen_string_literal: true

describe CampaignSerializer do
  describe '#as_json' do
    subject { CampaignSerializer.new(campaign).as_json }

    let(:campaign) { create(:campaign) }

    let(:line_item_1) { create(:line_item, campaign: campaign) }
    let(:line_item_2) { create(:line_item) }
    let(:line_item_3) { create(:line_item, campaign: campaign) }

    before do
      line_item_1
      line_item_2
      line_item_3
    end

    it "includes the id" do
      expect(subject[:id]).to eq(campaign.id)
    end

    it 'includes the name' do
      expect(subject[:name]).to eq(campaign.name)
    end

    it "includes all of the campaign's line items" do
      expect(subject[:lineItems]).to eq([line_item_1.as_json, line_item_3.as_json])
    end

    it 'includes the billable amount' do
      expect(subject[:billableAmount]).to eq(campaign.billable_amount.round(4))
    end
  end
end