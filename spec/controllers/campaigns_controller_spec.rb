# frozen_string_literal: true

require 'rails_helper'

describe CampaignsController, type: :controller do
  describe '#index' do
    subject(:parsed_response) { Oj.load(response.body, symbol_keys: true) }

    it 'returns the the campaigns with their line items' do
      campaign = create(:campaign)

      create(:line_item, campaign: campaign)
      create(:line_item, campaign: campaign)

      get :index

      expect(parsed_response).to eq(
        campaigns: [campaign.as_json],
        moreResults: false,
        grandTotal: campaign.billable_amount.round(4)
      )
    end

    context 'when there are no results' do
      it 'returns an empty array' do
        get :index

        expect(parsed_response).to eq(campaigns: [], moreResults: false, grandTotal: 0)
      end
    end

    describe 'filtering' do
      it 'returns the grandTotal based on the filtering' do
        campaign1 = create(:campaign, name: 'abba')
        campaign2 = create(:campaign, name: 'xylophone')
        campaign3 = create(:campaign, name: 'abra kadabra')

        create(:line_item, campaign: campaign1)
        create(:line_item, campaign: campaign1)
        create(:line_item, campaign: campaign2)
        create(:line_item, campaign: campaign2)
        create(:line_item, campaign: campaign3)

        get :index, params: { campaign_name: 'ab' }

        expected_total = (campaign1.billable_amount + campaign3.billable_amount).round(4)

        expect(parsed_response).to match(hash_including(grandTotal: expected_total))
      end

      context 'with no matching campaigns' do
        it 'returns an empty result' do
          create(:campaign, name: 'abba')
          create(:campaign, name: 'xylophone')
          create(:campaign, name: 'abra kadabra')

          get :index, params: { campaign_name: 'susan' }

          expect(parsed_response).to eq(campaigns: [], moreResults: false, grandTotal: 0)
        end
      end
    end

    describe 'pagination' do
      before do
        number_of_campaigns.times { create(:campaign) }
      end

      let(:number_of_campaigns) { 1 }

      context 'when requesting a negative page number' do
        it 'returns the first page of results' do
          get :index, params: { page: -1 }

          expect(parsed_response).to eq(campaigns: [Campaign.first.as_json], moreResults: false, grandTotal: 0)
        end
      end

      context 'when there are only ten results' do
        let(:number_of_campaigns) { 10 }

        it 'sets moreResults to false on the first page' do
          get :index, params: { page: 1 }

          expect(parsed_response).to match(hash_including(moreResults: false))
        end

        it 'returns the first ten campaigns on page 0' do
          get :index

          expect(parsed_response).to match(hash_including(campaigns: Campaign.first(10).map(&:as_json)))
        end

        it 'returns the first ten campaigns on page 1' do
          get :index, params: { page: 1 }

          expect(parsed_response).to match(hash_including(campaigns: Campaign.first(10).map(&:as_json)))
        end

        it 'returns an empty array of campaigns for later pages' do
          get :index, params: { page: 2 }

          expect(parsed_response).to match(hash_including(campaigns: []))
        end
      end

      context 'when there are fewer than ten results' do
        let(:number_of_campaigns) { 5 }

        it 'sets moreResults to false' do
          get :index, params: { page: 1 }

          expect(parsed_response).to match(hash_including(moreResults: false))
        end

        it 'returns those campaigns' do
          get :index, params: { page: 1 }

          expect(parsed_response).to match(
            hash_including(campaigns: Campaign.first(number_of_campaigns).map(&:as_json))
          )
        end
      end

      context 'when there are more than ten results' do
        let(:number_of_campaigns) { 11 }

        it 'sets moreResults to true on the first page' do
          get :index, params: { page: 1 }

          expect(parsed_response).to match(hash_including(moreResults: true))
        end

        it 'sets moreResults to false on the last page' do
          get :index, params: { page: 2 }

          expect(parsed_response).to match(hash_including(moreResults: false))
        end

        it 'returns the first ten campaigns on the first page' do
          get :index, params: { page: 1 }

          expect(parsed_response).to match(hash_including(campaigns: Campaign.first(10).map(&:as_json)))
        end

        it 'returns however many are left on the last page' do
          get :index, params: { page: 2 }

          expect(parsed_response).to match(hash_including(campaigns: Campaign.limit(10).offset(10).map(&:as_json)))
        end
      end
    end
  end
end
