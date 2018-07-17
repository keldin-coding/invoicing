# frozen_string_literal: true

require 'rails_helper'

describe LineItemsController, type: :controller do
  describe '#update' do
    it 'allows updating a line item' do
      create(:line_item)

      patch :update, params: { id: 1, adjustments: 100 }

      expect(response.status).to eq(200)
    end
  end
end
