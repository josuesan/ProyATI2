#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask import Flask, render_template, request, make_response, session, redirect, url_for, flash, escape
import os, json
from bson import json_util
from bson.objectid import ObjectId
from flask_sqlalchemy import SQLAlchemy
from app.models.users import Users
from app.models.products import productos
from flask_cors import CORS, cross_origin
from app import app, db
CORS(app)
db.create_all()

#db.session.add()
#db.session.commit()
@app.route('/')
def home(): 
	return render_template('home.html')

@app.route("/login", methods = ['GET', 'POST'])
def log_user():
	if request.method == 'POST':
		user = Users()
		usuario = request.form['usuario']
		clave = request.form['clave']
		if user.exist_user(usuario,clave):
			respuesta = {'error':False,'mensaje':'Usuario logueado'}
			return json.dumps(respuesta)

		else:
			respuesta = {'error':True,'mensaje':'Contrasena o Usuario incorrectos'} 
			return json.dumps(respuesta)
	return render_template('login.html')

@app.route("/datosregistro", methods = ['GET', 'POST'])
def registro_datos():
	if request.method == 'POST':
		user = Users()
		usuario = request.form['usuario']
		clave = request.form['clave']
		respuesta = user.get_user(usuario)
		return json.dumps(respuesta)
	return render_template('login.html') 
        

@app.route('/registro', methods = ['GET', 'POST'])
def Register():
	if request.method == 'POST':
		user = Users()
		print(request.form['birthdate'])
		print(request.form['gender'])
		user.create_user(request.form['username'],
					request.form['email'],
					request.form['password'],
					request.form['name'],
					request.form['lastname'],
					request.form['birthdate'],
					request.form['gender'])
		db.session.add(user)
		db.session.commit()
		if user.exist_user(request.form['username'],request.form['password']):
			respuesta = {'error':False,'mensaje':'Usuario registrado'}
			return json.dumps(respuesta)
		else:
			respuesta = {'error':True,'mensaje':'Contrasena o Usuario incorrectos'} 
			return json.dumps(respuesta)	
	return render_template('registro.html')

@app.route('/listar', methods = ['GET'])
def list():
	prod =productos()
	lista = prod.all_prod()
	if lista == 0:
		respuesta = {'error':True,'mensaje':'No hay artículos disponibles'} 
		return json.dumps(respuesta)

	number = prod.number_prod()
	jsona = prod.convert(lista,number)
	return json.dumps(jsona)

@app.route('/listar/<ide>', methods = ['GET'])
def part(ide):
	if ide.isdigit():
		_id = ide
		prod =productos()
		oneProd = prod.get_prod(_id)
		if oneProd == 0:
			respuesta = {'error':True,'mensaje':'Producto no existe'}
			return json.dumps(respuesta)
		else:
			oneProd = prod.get_prod(_id)
			return json.dumps(oneProd)
	respuesta = {'error':True,'mensaje':'Producto no existe'}
	return json.dumps(respuesta)

#@app.route('/editar/', methods = ['GET'])
#def ViewEditar():
	#return render_template('editar_producto.html')

@app.route('/editar/<ide>', methods = ['GET','POST'])
def edit(ide):
	if ide.isdigit():
		if request.method == 'POST':
			_id = ide
			prod =productos()
			oneProd = prod.get_prod(_id)
			if oneProd == 0:
				respuesta = {'error':True,'mensaje':'Producto no existe'}
				return json.dumps(respuesta)
			else:
				#obtengo el objeto del producto de la bd para poder editarlo y obtengo el nuevo registro a almacenar
				(objProd,prodEdit) = prod.set_prod(_id, request.form['nombre'], request.form['precio'], request.form['foto'], request.form['descripcion'], request.form['categoria'], request.form['vendido'])

				objProd.update(prodEdit)  #edito el artículo
				db.session.commit() #guardo los cammbios
				return json.dumps(prodEdit)
		else:
			_id = ide
			prod =productos()
			oneProd = prod.get_prod(_id)
			if oneProd == 0:
				respuesta = {'error':True,'mensaje':'Producto no existe'}
				return json.dumps(respuesta)
			else:
				return render_template('editar_producto.html', ident = oneProd['id'], nombre = oneProd['nombre'], precio = oneProd['precio'], foto = oneProd['foto'], descripcion = oneProd['descripcion'], categoria = oneProd['categoria'], vendido = oneProd['vendido'] )

	respuesta = {'error':True,'mensaje':'Producto no existe'}
	return json.dumps(respuesta)


@app.route('/borrar/<ide>', methods = ['GET'])
def delete(ide):
	if ide.isdigit():
		_id = ide	
		prod =productos()
		oneProd = prod.delete_prod(_id)
		if oneProd == 0:
			respuesta = {'error':True,'mensaje':'Producto no existe'}
			return json.dumps(respuesta)
		else: 
			db.session.delete(oneProd)
			db.session.commit()
			respuesta = {'error':False,'mensaje':'Producto Borrado'}
			return json.dumps(respuesta)
	respuesta = {'error':True,'mensaje':'Producto no existe'}
	return json.dumps(respuesta)


@app.route('/crear', methods = ['GET','POST'])
def create():	
	if request.method == 'POST':
		oneProd =productos()
		oneProd.create_prod(request.form['nombre'],request.form['precio'],request.form['foto'],request.form['descripcion'],request.form['categoria'],request.form['vendido'])
		db.session.add(oneProd)
		db.session.commit()
		respuesta = {'error':False,'mensaje':'Producto Creado'}
		return json.dumps(respuesta)

	return render_template('addProduct.html')