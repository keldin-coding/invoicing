# frozen_string_literal: true

class ApplicationSerializer
  attr_reader :record
  
  def initialize(record)
    @record = record
  end

  def as_json
    record.as_json
  end
end