class AddIndexForLineItemName < ActiveRecord::Migration[5.2]
  def change
    add_index :line_items, :name
  end
end
