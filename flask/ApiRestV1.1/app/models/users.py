from flask_sqlalchemy import SQLAlchemy
import datetime

from app import db

class Users(db.Model):
	id = db.Column(db.Integer,primary_key=True)
	username = db.Column(db.String(50),unique=True)
	email = db.Column(db.String(40),unique=True)
	password = db.Column(db.String(50))
	name = db.Column(db.String(50))
	lastName = db.Column(db.String(50))
	birthdate = db.Column(db.DateTime)
	gender = db.Column(db.String(50))


	def create_user(self, username, email, password, name, lastName, birthdate,gender):
		self.name = name
		self.lastName = lastName
		self.email = email
		self.username = username
		self.password = password
		self.birthdate = birthdate
		self.gender = gender

	def exist_user(self, username, pwd):		
		aux = Users.query.filter_by(username=username,password=pwd).first()
		if aux is None:
			return 0
		return 1

	def get_user(self, usuario):		
		aux = Users.query.filter_by(username=usuario).first()
		fecha = str(aux.birthdate.year)+'-'+str(aux.birthdate.month)+'-'+str(aux.birthdate.day)
		if aux is None:
			return 0
		return {'nombre': aux.name,'apellido':aux.lastName,'username': aux.username,'email':aux.email,'password': aux.password, 'nacimiento': fecha, 'genero':aux.gender}
	