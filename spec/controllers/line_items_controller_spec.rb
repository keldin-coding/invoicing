# frozen_string_literal: true

require 'rails_helper'

describe LineItemsController, type: :controller do
  describe '#index' do

    it 'returns all of the line items' do
      first = create(:line_item)
      second = create(:line_item)
      third = create(:line_item)

      get :index

      parsed_response = Oj.load(response.body, symbol_keys: true)

      expect(parsed_response[:lineItems]).to eq([first.as_json, second.as_json, third.as_json])
    end
  end
end