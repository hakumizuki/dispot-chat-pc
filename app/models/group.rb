class Group < ApplicationRecord
  has_many :massages
  has_many :group_users
  has_many :users, through: :group_users

  validates :name, presence: true, uniqueness: true

  belongs_to :note, optional: true
end
