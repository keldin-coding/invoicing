# frozen_string_literal: true

require 'rails_helper'

describe CampaignsController, type: :controller do
  describe '#index' do

    it 'returns all of the campaigns with their line items' do
      campaign_1 = create(:campaign)
      campaign_2 = create(:campaign)

      first = create(:line_item, campaign: campaign_1)
      second = create(:line_item, campaign: campaign_2)
      third = create(:line_item, campaign: campaign_1)

      get :index

      parsed_response = Oj.load(response.body, symbol_keys: true)

      expect(parsed_response).to eq([campaign_1.as_json, campaign_2.as_json])
    end
  end
end
