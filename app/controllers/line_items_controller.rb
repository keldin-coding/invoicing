# frozen_string_literal: true

class LineItemsController < ApplicationController
  def update
    line_item = LineItem.find(params[:id])

    line_item.update!(update_params)

    render json: line_item
  end

  private

  def update_params
    params.permit(:adjustments)
  end
end
