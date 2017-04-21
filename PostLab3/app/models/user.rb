class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  
  has_many :comments, dependent: :destroy

  validates :email, :presence => {:message => ": el email no debe estar vacío."}
  validates :username, :presence => {:message => ": el nombre de usuario no debe estar vacío."}, uniqueness: true
  validates :nombre, :presence => {:message => ": no debe estar vacío."}, length: { minimum: 2, :message => ": debe contener al menos dos caracteres."}
  validates :nacimiento, :presence => {:message => ": no debe estar vacía."}
  validates :genero, :presence => {:message => ": no debe estar vacío."}, length: { is: 1, :message => ": debe contener un solo caracter."}
  validates_format_of :genero, :with => /(F|M)|(f|m)/, :message => ": debe ingresar un género valido (M o F)"
  
end
