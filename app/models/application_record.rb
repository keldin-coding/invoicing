# frozen_string_literal: true

class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def as_json
    serializer = "#{self.class.name}Serializer".safe_constantize

    serializer ? serializer.new(self).as_json : super
  end
end
