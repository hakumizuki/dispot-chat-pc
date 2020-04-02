class Group < ApplicationRecord
  has_many :massages
  has_many :users, through: :group_users
  has_many :group_users
  belongs_to :note
end
