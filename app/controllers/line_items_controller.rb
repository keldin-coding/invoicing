# frozen_string_literal: true

class LineItemsController < ApplicationController
  def index
    items = LineItem.includes(:campaign)

    render json: Oj.dump({ lineItems: items.map(&:as_json) })
  end

  def update
    line_item = LineItem.find(params[:id])

    render json: Oj.dump(item.as_json)
  end
end