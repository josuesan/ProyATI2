class CreateProducts < ActiveRecord::Migration[5.0]
  def change
    create_table :products do |t|
      t.string :foto
      t.string :nombre
      t.text :descripcion
      t.string :categoria
      t.float :precio
      t.integer :vendido

      t.timestamps
    end
  end
end
