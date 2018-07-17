# frozen_string_literal: true

class AddReviewedFieldToLineItems < ActiveRecord::Migration[5.2]
  def change
    change_table :line_items do |t|
      t.boolean :reviewed, default: false, null: false
    end
  end
end
