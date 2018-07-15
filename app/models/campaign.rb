# frozen_string_literal: true

class Campaign < ApplicationRecord
  has_many :line_items
end