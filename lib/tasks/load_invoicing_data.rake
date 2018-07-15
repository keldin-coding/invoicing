# frozen_string_literal: true

task load_invoicing_data: :environment do
  file = File.read(Rails.root.join('db', 'invoicing_data.json'))

  data = Oj.load(file)

  data.each do |obj|
    campaign = Campaign.find_or_create_by!(id: obj['campaign_id'], name: obj['campaign_name'])

    LineItem.create!(
      id: obj['id'], 
      campaign: campaign, 
      name: obj['line_item_name'],
      booked_amount: obj['booked_amount'], 
      adjustments: obj['adjustments'], 
      actual_amount: obj['actual_amount'],
    )
  end
end