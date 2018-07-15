# frozen_string_literal: true

require 'rails_helper'

describe CampaignsController, type: :controller do
  describe '#index' do

    it 'returns all of the line items' do
      first = create(:line_item)
      second = create(:line_item)
      third = create(:line_item)

      get :index

      parsed_response = Oj.load(response.body, symbol_keys: true)

      expect(parsed_response).to eq([
        {
          name: first.campaign.name,
          lineItems: [
            first.as_json
          ],
          billableAmount: first.campaign.billable_amount.round(4)
        },
        {
          name: second.campaign.name,
          lineItems: [
            second.as_json
          ],
          billableAmount: second.campaign.billable_amount.round(4)
        },
        {
          name: third.campaign.name,
          lineItems: [
            third.as_json
          ],
          billableAmount: third.campaign.billable_amount.round(4)
        }
      ])
    end
  end
end
