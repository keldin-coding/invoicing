class CreateLineItems < ActiveRecord::Migration[5.2]
  def change
    create_table :line_items do |t|
    	t.string :name
    	t.float :booked_amount
    	t.float :actual_amount
    	t.float :adjustments

    	t.timestamps
    end
  end
end
