# frozen_string_literal: true

require 'rails_helper'

describe Campaign, type: :model do
  describe 'validations' do
    subject { build(:campaign) }

    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_uniqueness_of(:name) }
  end
end