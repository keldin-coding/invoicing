class AddIndexForCampaignName < ActiveRecord::Migration[5.2]
  def change
    add_index :campaigns, :name
  end
end
