# frozen_string_literal: true

class LineItemsController < ApplicationController
  def index
    items = LineItem.limit(50).offset(offset)

    render json: { line_items: items }
  end

  def show
    LineItem.find(params[:id])
  end

  def update
    line_item = LineItem.find(params[:id])
  end

  private

  def offset
    params[:page].to_i * page_size
  end
end