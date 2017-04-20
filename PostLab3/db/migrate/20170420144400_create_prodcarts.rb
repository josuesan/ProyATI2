class CreateProdcarts < ActiveRecord::Migration[5.0]
  def change
    create_table :prodcarts do |t|
      t.string :username
      t.integer :id_prod
      t.integer :cant_prod

      t.timestamps
    end
  end
end
