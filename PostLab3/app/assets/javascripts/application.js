// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require bootstrap-sprockets
//= require_tree .

function Get_all_products(){
	
	$.ajax({
		url: 'http://localhost:5000/listar',
		contentType: 'application/json',
		crossDomain : "true",
		type : 'GET',
		success: function(response) {
			data=JSON.parse(response)
			for(var i in data) {

			    console.log(data[i].nombre);   // (o el campo que necesites)
			}
			listar(data);
		},
		error: function(error) {}
	});
};

function Get_product(id){
	
	$.ajax({
		url: 'http://localhost:5000/listar/'+id,
		contentType: 'application/json',
		crossDomain : "true",
		type : 'GET',
		success: function(response) {
			data=JSON.parse(response)
			if (data.error==true) {
				console.log("error");
			}
			else{
				console.log(response);
			 	console.log(data.nombre);   // (o el campo que necesites)	
			}


		},
		error: function(error) {}
	});
};

function Delete_product(id){
	
	$.ajax({
		url: 'http://localhost:5000/borrar/'+id,
		contentType: 'application/json',
		crossDomain : "true",
		type : 'GET',
		success: function(response) {
			data=JSON.parse(response)
			if (data.error==true) {
				console.log("error");
			}
			else{
				//error false enviar mensaje afirmativo
			 	console.log(data.nombre);   // (o el campo que necesites)	
			}
			return data;

		},
		error: function(error) {}
	});
};

/*function Add_product(nombre,precio,foto,descripcion,categoria,vendido){

	$.ajax({
		url: 'http://localhost:5000/crear',
		contentType: 'application/json',
		crossDomain : "true",
		data: JSON.stringify({"nombre": nombre, "precio": precio,"foto": foto, "descripcion":descripcion,"categoria": categoria, "vendido":vendido }),
		type : 'POST',
		success: function(response) {
			data=JSON.parse(response)
			if (data.error==false) {
				console.log("Producto creado");
			}


		},
		error: function(error) {}
	});
};*/

function listar(productos) {	
	tam = productos.length

	for (i = 0; i < tam; i++) {
			$("p").append(data[i].nombre);
			$("p").append(data[i].precio);
			$("p").append(data[i].foto);
			$("p").append(data[i].categoria);
			$("p").append(data[i].descripcion);
			$("p").append(data[i].vendido);
		;
	}

};

$(document).ready(function() {
	index = 0;
	///Get_all_products();
	//Get_product(5);
	//Add_product("camisa",150,"camisa.jpg","es una camisa","camisas",4);
	console.log(index);
}); 
