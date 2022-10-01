class CreateSlots < ActiveRecord::Migration[7.0]
  def change
    create_table :slots do |t|
      t.datetime :start_time, null: false, index: { unique: true }
      t.datetime :end_time, null: false, index: { unique: true }

      t.timestamps
    end
  end
end
