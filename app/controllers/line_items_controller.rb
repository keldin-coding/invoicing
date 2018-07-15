# frozen_string_literal: true

class LineItemsController < ApplicationController
  def update
    line_item = LineItem.find(params[:id])

    render json: Oj.dump(item.as_json)
  end
end