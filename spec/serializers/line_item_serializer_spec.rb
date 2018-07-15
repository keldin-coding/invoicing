# frozen_string_literal: true

require 'rails_helper'

describe LineItemSerializer do
  describe '#as_json' do
    let(:line_item) { build(:line_item) }

    subject { LineItemSerializer.new(line_item).as_json }

    it 'includes the id' do
      expect(subject).to match(hash_including(id: line_item.id))
    end

    it 'includes the name' do
      expect(subject).to match(hash_including(name: line_item.name))
    end

    it 'includes the bookedAmount rounded to four decimal points' do
      expect(subject).to match(hash_including(bookedAmount: line_item.booked_amount.round(4)))
    end

    it 'includes the actualAmount rounded to four decimal points' do
      expect(subject).to match(hash_including(actualAmount: line_item.actual_amount.round(4)))
    end

    it 'includes the adjustments rounded to four decimal points' do
      expect(subject).to match(hash_including(adjustments: line_item.adjustments.round(4)))
    end

    it 'includes the billableAmount rounded to four decimal points' do
      expect(subject).to match(hash_including(billableAmount: line_item.billable_amount.round(4)))
    end
  end
end