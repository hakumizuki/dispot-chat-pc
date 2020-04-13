class CreateGroupRequests < ActiveRecord::Migration[5.2]
  def change
    create_table :group_requests do |t|

      t.timestamps
    end
  end
end
