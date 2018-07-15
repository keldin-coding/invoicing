# frozen_string_literal: true

class ApplicationController < ActionController::Base
  DEFAULT_PAGE_SIZE = 50

  private

  def page_size
    DEFAULT_PAGE_SIZE
  end
end
