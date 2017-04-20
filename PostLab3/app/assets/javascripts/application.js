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
			/*for(var i in data) {

			    console.log(data[i].nombre);   // (o el campo que necesites)
			}*/
			listar(data);
		},
		error: function(error) {}
	});
};

function Get_all_products_categoria(){
	
	$.ajax({
		url: 'http://localhost:5000/listar',
		contentType: 'application/json',
		crossDomain : "true",
		type : 'GET',
		success: function(response) {
			data=JSON.parse(response)
			/*for(var i in data) {

			    console.log(data[i].nombre);   // (o el campo que necesites)
			}*/
			Mostrar_Categoria(data);
		},
		error: function(error) {}
	});
};

function Get_Favorite_Products(){
	
	$.ajax({
		url: 'http://localhost:5000/listar',
		contentType: 'application/json',
		crossDomain : "true",
		type : 'GET',
		success: function(response) {
			data=JSON.parse(response)
			/*for(var i in data) {

			    console.log(data[i].nombre);   // (o el campo que necesites)
			}*/
			listFav(data);
		},
		error: function(error) {}
	});
};

function Get_product(id){
	
	$.ajax({
		url: 'http://localhost:5000/listar/'+id,
		contentType: 'application/json',
		crossDomain : "true",
		async: false, 
		type : 'GET',
		success: function(response) {
			data=JSON.parse(response)
			if (data.error==true) {
				//console.log("error");
			}
			else{
				//console.log(response);
			 	//console.log(data);   // (o el campo que necesites)	
			 	mostrar(data);			}


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
				//console.log("error");
			}
			else{
				//error false enviar mensaje afirmativo
			 	//console.log(data.nombre);   // (o el campo que necesites)	
			}
			return data;

		},
		error: function(error) {}
	});
};



function Add_product(){
		console.log($("#formulario").serialize());
		var x =$("#formulario").serialize();
    $.ajax({
          url: 'http://localhost:5000/crear',
			crossDomain : "true",
			async: false, 
			data: x,
			type : 'POST',
            // Adjuntar los campos del formulario enviado.
           success: function(response)
           {

               data=JSON.parse(response)
				if (data.error==false) {
					//console.log(data);
					limpiaForm($("#formulario"));
					alert("producto creado");
				}
				else{
					limpiaForm($("#formulario"));
					alert("producto no creado , vuelva intentar");
				}
           },
			error: function(error) {
				//console.log("hola");
				var i = false;
			}
         });
 	};

 function Editar_product(id){
		console.log($("#formulario").serialize());
		var x =$("#formulario").serialize();
	    $.ajax({
	          url: 'http://localhost:5000/editar/'+id,
				crossDomain : "true",
				async: false, 
				data: x,
				type : 'POST',
	            // Adjuntar los campos del formulario enviado.
	           success: function(response)
	           {
	                // Mostrar la respuestas del script PHP.
	               data=JSON.parse(response)
	               //console.log(data);
					if (data.id==id) {
						//console.log(data);
						
						alert("producto editado");
					}
					else{
						limpiaForm($("#formulario"));
						alert("producto no editado , vuelva intentar");
					}
	           },
				error: function(error) {
					//console.log("hola");
				}
	    });
	};


function listar(productos) {	
	var tam = productos.length;

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

function limpiaForm(miForm) {
// recorremos todos los campos que tiene el formulario
	$(":input", miForm).each(function() {
		var type = this.type;
		var tag = this.tagName.toLowerCase();
		//limpiamos los valores de los campos…
		if (type == "text" || type == "password" || tag == "textarea")
			this.value = "";
		// excepto de los checkboxes y radios, le quitamos el checked
		// pero su valor no debe ser cambiado
		else if (type == "checkbox" || type == "radio")
			this.checked = false;
		// los selects le ponesmos el indice a -
		else if (tag == "select")
			this.selectedIndex = -1;
	});
};


$(document).ready(function(){
	//var index = 0;
	///Get_all_products();
	//Get_product(5);
	//$("#btn_enviar").click(Add_product());
	//$("#btn_edit_enviar").click(Editar_product());
	//Add_product();
	//console.log(index);
}); 
