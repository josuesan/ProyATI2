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

function sesion_api(){
		var x =$("#formulario").serialize();
		var usuario = $("#usuario").val();
		var pass = $("#pass").val();
    $.ajax({
          url: 'http://localhost:5000/login',
			crossDomain : "true",
			async: false, 
			data: x,
			type : 'POST',
            // Adjuntar los campos del formulario enviado.
           success: function(response)
           {
                // Mostrar la respuestas del script PHP.
               data=JSON.parse(response)
				if (data.error==false) {
					console.log(data);
					//$("#Formulario")[0].reset();
					limpiaForm($("#formulario"));
					$.ajax({
						url: 'http://localhost:5000/datosregistro',
						crossDomain : "true",
						async: false, 
						data: x,
						type : 'POST',
						success: function(response) {
							x=JSON.parse(response);
							console.log(x);
							$.ajax({
								url: '/users/registroapi',
								async: false, 
								data: x,
								type : 'POST',
								success: function(response) {
								},
								error: function(error) {
								}
							});
						},
						error: function(error) {
							limpiaForm($("#formulario"));
							alertify.error("No se han podido obtener los datos de el API para completar el registro.");
						}
					});
				}
				else{
					limpiaForm($("#formulario"));
					alertify.error("Usuario y/o contraseña inválidos.");
				}
           },
			error: function(error) {
				var i = false;
				alertify.error("No se ha podido iniciar sesión con su cuenta en el API.");
			}
         });

    	//return i; // Evitar ejecutar el submit del formulario.
 	};

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
				alertify.error("Error al obtener el producto.");
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
				alertify.error("Error al eliminar el producto.");
			}
			else{
				//error false enviar mensaje afirmativo
			 	//console.log(data.nombre);   // (o el campo que necesites)	
			 	alertify.success("Producto elimininado.");
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
					alertify.success("Producto creado.");
				}
				else{
					limpiaForm($("#formulario"));
					alertify.error("Producto no creado, vuelva a intentar.");
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
						alertify.success("Producto editado.");
					}
					else{
						limpiaForm($("#formulario"));
						alertify.error("Producto no editado, vuelva a intentar.");
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

function Add_to_cart(){
	 var id_prod = buscarID();
	 var aux ={"id_prod": id_prod};
	 console.log("hola");
	$.ajax({
		url: '/prodcarts/add',
		data: aux,
		type : 'POST',
		success: function(response) {

		},
		error: function(error) {}
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
	/*var id_prod = buscarID();
	var x ={"id_prod": id_prod};
	console.log(x);*/
	/*var aux = JSON.parse({"id_prod": id_prod});
	console.log(aux);*/

}); 







//ALERTIFY

/**
 * alertify
 * An unobtrusive customizable JavaScript notification system
 *
 * @author Fabien Doiron <fabien.doiron@gmail.com>
 * @copyright Fabien Doiron 2012
 * @license MIT <http://opensource.org/licenses/mit-license.php>
 * @link http://www.github.com/fabien-d
 * @module alertify
 * @version 0.2.12
 */

/**
 * alertify
 * An unobtrusive customizable JavaScript notification system
 *
 * @author Fabien Doiron <fabien.doiron@gmail.com>
 * @copyright Fabien Doiron 2012
 * @license MIT <http://opensource.org/licenses/mit-license.php>
 * @link http://www.github.com/fabien-d
 * @module alertify
 * @version 0.2.12
 */

/*global define*/
(function (global, undefined) {
	"use strict";

	var document = global.document,
	    Alertify;

	Alertify = function () {

		var _alertify = {},
		    dialogs   = {},
		    isopen    = false,
		    keys      = { ENTER: 13, ESC: 27, SPACE: 32 },
		    queue     = [],
		    $, elCallee, elCover, elDialog, elLog;

		/**
		 * Markup pieces
		 * @type {Object}
		 */
		dialogs = {
			buttons : {
				holder : "<nav class=\"alertify-buttons\">{{buttons}}</nav>",
				submit : "<button type=\"submit\" class=\"alertify-button alertify-button-ok\" id=\"alertify-ok\" />{{ok}}</button>",
				ok     : "<a href=\"#\" class=\"alertify-button alertify-button-ok\" id=\"alertify-ok\">{{ok}}</a>",
				cancel : "<a href=\"#\" class=\"alertify-button alertify-button-cancel\" id=\"alertify-cancel\">{{cancel}}</a>"
			},
			input   : "<input type=\"text\" class=\"alertify-text\" id=\"alertify-text\">",
			message : "<p class=\"alertify-message\">{{message}}</p>",
			log     : "<article class=\"alertify-log{{class}}\">{{message}}</article>"
		};

		/**
		 * Shorthand for document.getElementById()
		 *
		 * @param  {String} id    A specific element ID
		 * @return {Object}       HTML element
		 */
		$ = function (id) {
			return document.getElementById(id);
		};

		/**
		 * Alertify private object
		 * @type {Object}
		 */
		_alertify = {

			/**
			 * Labels object
			 * @type {Object}
			 */
			labels : {
				ok     : "Aceptar",
				cancel : "Cancelar"
			},

			/**
			 * Delay number
			 * @type {Number}
			 */
			delay : 5000,

			/**
			 * Set the proper button click events
			 *
			 * @param {Function} fn    [Optional] Callback function
			 *
			 * @return {undefined}
			 */
			addListeners : function (fn) {
				var btnReset  = $("alertify-resetFocus"),
				    btnOK     = $("alertify-ok")     || undefined,
				    btnCancel = $("alertify-cancel") || undefined,
				    input     = $("alertify-text")   || undefined,
				    form      = $("alertify-form")   || undefined,
				    hasOK     = (typeof btnOK !== "undefined"),
				    hasCancel = (typeof btnCancel !== "undefined"),
				    hasInput  = (typeof input !== "undefined"),
				    val       = "",
				    self      = this,
				    ok, cancel, common, key, reset;

				// ok event handler
				ok = function (event) {
					if (typeof event.preventDefault !== "undefined") event.preventDefault();
					common(event);
					if (typeof input !== "undefined") val = input.value;
					if (typeof fn === "function") fn(true, val);
				};

				// cancel event handler
				cancel = function (event) {
					if (typeof event.preventDefault !== "undefined") event.preventDefault();
					common(event);
					if (typeof fn === "function") fn(false);
				};

				// common event handler (keyup, ok and cancel)
				common = function (event) {
					self.hide();
					self.unbind(document.body, "keyup", key);
					self.unbind(btnReset, "focus", reset);
					if (hasInput) self.unbind(form, "submit", ok);
					if (hasOK) self.unbind(btnOK, "click", ok);
					if (hasCancel) self.unbind(btnCancel, "click", cancel);
				};

				// keyup handler
				key = function (event) {
					var keyCode = event.keyCode;
					if (keyCode === keys.SPACE && !hasInput) ok(event);
					if (keyCode === keys.ESC && hasCancel) cancel(event);
				};

				// reset focus to first item in the dialog
				reset = function (event) {
					if (hasInput) input.focus();
					else if (hasCancel) btnCancel.focus();
					else btnOK.focus();
				};

				// handle reset focus link
				// this ensures that the keyboard focus does not
				// ever leave the dialog box until an action has
				// been taken
				this.bind(btnReset, "focus", reset);
				// handle OK click
				if (hasOK) this.bind(btnOK, "click", ok);
				// handle Cancel click
				if (hasCancel) this.bind(btnCancel, "click", cancel);
				// listen for keys, Cancel => ESC
				this.bind(document.body, "keyup", key);
				// bind form submit
				if (hasInput) this.bind(form, "submit", ok);
				// set focus on OK button or the input text
				global.setTimeout(function () {
					if (input) {
						input.focus();
						input.select();
					}
					else btnOK.focus();
				}, 50);
			},

			/**
			 * Bind events to elements
			 *
			 * @param  {Object}   el       HTML Object
			 * @param  {Event}    event    Event to attach to element
			 * @param  {Function} fn       Callback function
			 *
			 * @return {undefined}
			 */
			bind : function (el, event, fn) {
				if (typeof el.addEventListener === "function") {
					el.addEventListener(event, fn, false);
				} else if (el.attachEvent) {
					el.attachEvent("on" + event, fn);
				}
			},

			/**
			 * Build the proper message box
			 *
			 * @param  {Object} item    Current object in the queue
			 *
			 * @return {String}         An HTML string of the message box
			 */
			build : function (item) {
				var html    = "",
				    type    = item.type,
				    message = item.message;

				html += "<div class=\"alertify-dialog\">";

				if (type === "prompt") html += "<form id=\"alertify-form\">";

				html += "<article class=\"alertify-inner\">";
				html += dialogs.message.replace("{{message}}", message);

				if (type === "prompt") html += dialogs.input;

				html += dialogs.buttons.holder;
				html += "</article>";

				if (type === "prompt") html += "</form>";

				html += "<a id=\"alertify-resetFocus\" class=\"alertify-resetFocus\" href=\"#\">Reset Focus</a>";
				html += "</div>";

				switch (type) {
				case "confirm":
					html = html.replace("{{buttons}}", dialogs.buttons.ok + dialogs.buttons.cancel);
					html = html.replace("{{ok}}", this.labels.ok).replace("{{cancel}}", this.labels.cancel);
					break;
				case "prompt":
					html = html.replace("{{buttons}}", dialogs.buttons.submit + dialogs.buttons.cancel);
					html = html.replace("{{ok}}", this.labels.ok).replace("{{cancel}}", this.labels.cancel);
					break;
				case "alert":
					html = html.replace("{{buttons}}", dialogs.buttons.ok);
					html = html.replace("{{ok}}", this.labels.ok);
					break;
				default:
					break;
				}

				elDialog.className = "alertify alertify-show alertify-" + type;
				elCover.className  = "alertify-cover";
				return html;
			},

			/**
			 * Close the log messages
			 *
			 * @param  {Object} elem    HTML Element of log message to close
			 * @param  {Number} wait    [optional] Time (in ms) to wait before automatically hiding the message
			 *
			 * @return {undefined}
			 */
			close : function (elem, wait) {
				var timer = (wait && !isNaN(wait)) ? +wait : this.delay; // Unary Plus: +"2" === 2
				this.bind(elem, "click", function () {
					elLog.removeChild(elem);
				});
				setTimeout(function () {
					if (typeof elem !== "undefined" && elem.parentNode === elLog) elLog.removeChild(elem);
				}, timer);
			},

			/**
			 * Create a dialog box
			 *
			 * @param  {String}   message        The message passed from the callee
			 * @param  {String}   type           Type of dialog to create
			 * @param  {Function} fn             [Optional] Callback function
			 * @param  {String}   placeholder    [Optional] Default value for prompt input field
			 *
			 * @return {Object}
			 */
			dialog : function (message, type, fn, placeholder) {
				// set the current active element
				// this allows the keyboard focus to be resetted
				// after the dialog box is closed
				elCallee = document.activeElement;
				// check to ensure the alertify dialog element
				// has been successfully created
				var check = function () {
					if (elDialog && elDialog.scrollTop !== null) return;
					else check();
				};
				// error catching
				if (typeof message !== "string") throw new Error("message must be a string");
				if (typeof type !== "string") throw new Error("type must be a string");
				if (typeof fn !== "undefined" && typeof fn !== "function") throw new Error("fn must be a function");
				// initialize alertify if it hasn't already been done
				if (typeof this.init === "function") {
					this.init();
					check();
				}

				queue.push({ type: type, message: message, callback: fn, placeholder: placeholder });
				if (!isopen) this.setup();

				return this;
			},

			/**
			 * Extend the log method to create custom methods
			 *
			 * @param  {String} type    Custom method name
			 *
			 * @return {Function}
			 */
			extend : function (type) {
				return function (message, wait) { this.log(message, type, wait); };
			},

			/**
			 * Hide the dialog and rest to defaults
			 *
			 * @return {undefined}
			 */
			hide : function () {
				// remove reference from queue
				queue.splice(0,1);
				// if items remaining in the queue
				if (queue.length > 0) this.setup();
				else {
					isopen = false;
					elDialog.className = "alertify alertify-hide alertify-hidden";
					elCover.className  = "alertify-cover alertify-hidden";
					// set focus to the last element or body
					// after the dialog is closed
					elCallee.focus();
				}
			},

			/**
			 * Initialize Alertify
			 * Create the 2 main elements
			 *
			 * @return {undefined}
			 */
			init : function () {
				// ensure legacy browsers support html5 tags
				document.createElement("nav");
				document.createElement("article");
				document.createElement("section");
				// cover
				elCover = document.createElement("div");
				elCover.setAttribute("id", "alertify-cover");
				elCover.className = "alertify-cover alertify-hidden";
				document.body.appendChild(elCover);
				// main element
				elDialog = document.createElement("section");
				elDialog.setAttribute("id", "alertify");
				elDialog.className = "alertify alertify-hidden";
				document.body.appendChild(elDialog);
				// log element
				elLog = document.createElement("section");
				elLog.setAttribute("id", "alertify-logs");
				elLog.className = "alertify-logs";
				document.body.appendChild(elLog);
				// set tabindex attribute on body element
				// this allows script to give it focus
				// after the dialog is closed
				document.body.setAttribute("tabindex", "0");
				// clean up init method
				delete this.init;
			},

			/**
			 * Show a new log message box
			 *
			 * @param  {String} message    The message passed from the callee
			 * @param  {String} type       [Optional] Optional type of log message
			 * @param  {Number} wait       [Optional] Time (in ms) to wait before auto-hiding the log
			 *
			 * @return {Object}
			 */
			log : function (message, type, wait) {
				// check to ensure the alertify dialog element
				// has been successfully created
				var check = function () {
					if (elLog && elLog.scrollTop !== null) return;
					else check();
				};
				// initialize alertify if it hasn't already been done
				if (typeof this.init === "function") {
					this.init();
					check();
				}
				this.notify(message, type, wait);
				return this;
			},

			/**
			 * Add new log message
			 * If a type is passed, a class name "alertify-log-{type}" will get added.
			 * This allows for custom look and feel for various types of notifications.
			 *
			 * @param  {String} message    The message passed from the callee
			 * @param  {String} type       [Optional] Type of log message
			 * @param  {Number} wait       [Optional] Time (in ms) to wait before auto-hiding
			 *
			 * @return {undefined}
			 */
			notify : function (message, type, wait) {
				var log = document.createElement("article");
				log.className = "alertify-log" + ((typeof type === "string" && type !== "") ? " alertify-log-" + type : "");
				log.innerHTML = message;
				// prepend child
				elLog.insertBefore(log, elLog.firstChild);
				// triggers the CSS animation
				setTimeout(function() { log.className = log.className + " alertify-log-show"; }, 50);
				this.close(log, wait);
			},

			/**
			 * Set properties
			 *
			 * @param {Object} args     Passing parameters
			 *
			 * @return {undefined}
			 */
			set : function (args) {
				var k;
				// error catching
				if (typeof args !== "object" && args instanceof Array) throw new Error("args must be an object");
				// set parameters
				for (k in args) {
					if (args.hasOwnProperty(k)) {
						this[k] = args[k];
					}
				}
			},

			/**
			 * Initiate all the required pieces for the dialog box
			 *
			 * @return {undefined}
			 */
			setup : function () {
				var item = queue[0];

				isopen = true;
				elDialog.innerHTML = this.build(item);
				if (typeof item.placeholder === "string") $("alertify-text").value = item.placeholder;
				this.addListeners(item.callback);
			},

			/**
			 * Unbind events to elements
			 *
			 * @param  {Object}   el       HTML Object
			 * @param  {Event}    event    Event to detach to element
			 * @param  {Function} fn       Callback function
			 *
			 * @return {undefined}
			 */
			unbind : function (el, event, fn) {
				if (typeof el.removeEventListener === "function") {
					el.removeEventListener(event, fn, false);
				} else if (el.detachEvent) {
					el.detachEvent("on" + event, fn);
				}
			}
		};

		return {
			alert   : function (message, fn) { _alertify.dialog(message, "alert", fn); return this; },
			confirm : function (message, fn) { _alertify.dialog(message, "confirm", fn); return this; },
			extend  : _alertify.extend,
			init    : _alertify.init,
			log     : function (message, type, wait) { _alertify.log(message, type, wait); return this; },
			prompt  : function (message, fn, placeholder) { _alertify.dialog(message, "prompt", fn, placeholder); return this; },
			success : function (message, wait) { _alertify.log(message, "success", wait); return this; },
			error   : function (message, wait) { _alertify.log(message, "error", wait); return this; },
			set     : function (args) { _alertify.set(args); },
			labels  : _alertify.labels
		};
	};

	// AMD and window support
	if (typeof define === "function") {
		define([], function () { return new Alertify(); });
	} else {
		if (typeof global.alertify === "undefined") {
			global.alertify = new Alertify();
		}
	}

}(this));