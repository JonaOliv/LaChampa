$(function() {
	// variables para los filtros
	var carneAsada = new L.LayerGroup();
	var mariscos = new L.LayerGroup();
	var baleada = new L.LayerGroup();
	var foodcourt = new L.LayerGroup();
	var vLayers = [carneAsada,mariscos,baleada,foodcourt];

	var baseLayers={};
	var overlays = {
			"Mariscos": mariscos,
			"Carnes Asadas": carneAsada,
			"Baleadas": baleada,
			"FoodCourts": foodcourt
		};
		//tambien uso la funcion setMarker y lo que contiene
 //---------------------------------------
 //variables para el panel
 var vDocnum = [];
 //---------------
	var map;

	// estilos de iconos de marcadores personalizados
	var tinyIcon = L.Icon.extend({
		options: {
			shadowUrl: "../assets/marker-shadow.png",
			iconSize: [25, 39],
			iconAnchor:   [12, 36],
			shadowSize: [41, 41],
			shadowAnchor: [12, 38],
			popupAnchor: [0, -30]
		}
	});
	var redIcon = new tinyIcon({ iconUrl: "../assets/marker-red.png" });
	var yellowIcon = new tinyIcon({ iconUrl: "../assets/marker-yellow.png" });

	// check whether browser supports geolocation api
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(positionSuccess, positionError, { enableHighAccuracy: true });
	} else {
		$(".map").text("Your browser is out of fashion, there\'s no geolocation!");
	}

	function positionSuccess(position) {
		var lat = position.coords.latitude;
		var lng = position.coords.longitude;
		var acr = position.coords.accuracy;
		// mark user's position
		var userMarker = L.marker([lat, lng], {
			icon: redIcon
		});

		// load leaflet map
		//los layers vendrian siendo nuestros checkbox en los filtros
		map = L.map("map",{layers: vLayers}).setView([lat, lng], 16);

		// leaflet API key tiler es decir de donde se carga el mapa
		L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
			maxZoom: 18,
			attribution: "",
			detectRetina: true }).addTo(map);
			//se agrega la ubicacion actual del usuario
		userMarker.addTo(map);
		/*
		userMarker.on('click', function(e) {
    	alert(e.latlng);
			console.log("Hola soy click");
		});*/
		userMarker.bindPopup("Usted esta aqui").openPopup();
		//funcion que pone los restaurantes en el mapa por categorias
    setMarker();
	}

  function setMarker() {
		setCatMariscos();
		setCatCarneAsada();
		setCatBaleadas();
		setCatFoodCourts();
		//aqui agregamos la caja para los filtros
		L.control.layers(baseLayers,overlays).addTo(map);
	}

	function setPanelNoFoodCourt(number){
		console.log(vDocnum[number]);
		$.ajax("panel/"+vDocnum[number],
	          {
	              "method":"GET",
	              "data":{},
	              "dataType":"json",
	              "success":function(jsonDoc,status,jqXHR){
										$( "#nombreLocal" ).text(jsonDoc.restaurantes[0].properties.nombre);
										$( "#descripcion" ).text(jsonDoc.restaurantes[0].properties.popupContent);
										$( "#puntos" ).text(jsonDoc.restaurantes[0].properties.rating);
										$("#preciosLocales li").remove();

										for (i = 0; i < jsonDoc.restaurantes[0].properties.menu.length; i++) {
											$("#preciosLocales").append("<li class='ui-li' data-theme='c'><span>"
											+jsonDoc.restaurantes[0].properties.menu[i].nombreComida+" "
											+jsonDoc.restaurantes[0].properties.menu[i].precio
											 +"</span></li>");
										}
	              },
	              "error":function(jqXHR,status, errorMsg){
	                  console.log(errorMsg);
	                  console.log("error");
	              }
	          }
	  );//ajax
		$("#like").on('click', function(e){
			console.log("soy like");
		});//$("#like").on('click'
	}

	function setCatMariscos(){
		$.ajax("mapa/CatMariscos",
	          {
	              "method":"GET",
	              "data":{},
	              "dataType":"json",
	              "success":function(jsonDoc,status,jqXHR){
										for (i = 0; i < jsonDoc.restaurantes.length; i++) {
											var marker = L.marker([jsonDoc.restaurantes[i].geometry.coordinates[0],
								        jsonDoc.restaurantes[i].geometry.coordinates[1]], { icon: yellowIcon }).addTo(mariscos);
								      marker.bindPopup(jsonDoc.restaurantes[i].properties.popupContent);

											var cadena = jsonDoc.restaurantes[i].geometry.coordinates[0]+"_"+jsonDoc.restaurantes[i].geometry.coordinates[1];
											cadena=cadena.replace(/\-|\.|\_/gi,"");
											vDocnum[cadena]=jsonDoc.restaurantes[i].docnum;
											marker.on('click', function(e) {
												$( "#mypanel" ).panel( "open" , {} );

												var cadena = e.latlng.lat+"_"+e.latlng.lng;
												cadena=cadena.replace(/\-|\.|\_/gi,"");
												setPanelNoFoodCourt(cadena);

											});//marker.on click
										}

	              },
	              "error":function(jqXHR,status, errorMsg){
	                  console.log(errorMsg);
	                  console.log("error");
	              }
	          }
	  );//ajax
	}

	function setCatCarneAsada(){
		$.ajax("mapa/CatCarneAsada",
	          {
	              "method":"GET",
	              "data":{},
	              "dataType":"json",
	              "success":function(jsonDoc,status,jqXHR){
										for (i = 0; i < jsonDoc.restaurantes.length; i++) {
											var marker = L.marker([jsonDoc.restaurantes[i].geometry.coordinates[0],
								        jsonDoc.restaurantes[i].geometry.coordinates[1]], { icon: yellowIcon }).addTo(carneAsada);
								      marker.bindPopup(jsonDoc.restaurantes[i].properties.popupContent);

											var cadena = jsonDoc.restaurantes[i].geometry.coordinates[0]+"_"+jsonDoc.restaurantes[i].geometry.coordinates[1];
											cadena=cadena.replace(/\-|\.|\_/gi,"");
											vDocnum[cadena]=jsonDoc.restaurantes[i].docnum;

											marker.on('click', function(e) {
												$( "#mypanel" ).panel( "open" , {} );

												var cadena = e.latlng.lat+"_"+e.latlng.lng;
												cadena=cadena.replace(/\-|\.|\_/gi,"");
												setPanelNoFoodCourt(cadena);

											});//marker.on click
										}

	              },
	              "error":function(jqXHR,status, errorMsg){
	                  console.log(errorMsg);
	                  console.log("error");
	              }
	          }
	  );//ajax

	}

	function setCatBaleadas() {
		$.ajax("mapa/CatBaleadas",
	          {
	              "method":"GET",
	              "data":{},
	              "dataType":"json",
	              "success":function(jsonDoc,status,jqXHR){
										for (i = 0; i < jsonDoc.restaurantes.length; i++) {
											var marker = L.marker([jsonDoc.restaurantes[i].geometry.coordinates[0],
								        jsonDoc.restaurantes[i].geometry.coordinates[1]], { icon: yellowIcon }).addTo(carneAsada);
								      marker.bindPopup(jsonDoc.restaurantes[i].properties.popupContent);

											var cadena = jsonDoc.restaurantes[i].geometry.coordinates[0]+"_"+jsonDoc.restaurantes[i].geometry.coordinates[1];
											cadena=cadena.replace(/\-|\.|\_/gi,"");
											vDocnum[cadena]=jsonDoc.restaurantes[i].docnum;

											marker.on('click', function(e) {
												$( "#mypanel" ).panel( "open" , {} );

												var cadena = e.latlng.lat+"_"+e.latlng.lng;
												cadena=cadena.replace(/\-|\.|\_/gi,"");
												setPanelNoFoodCourt(cadena);

											});//marker.on click
										}

	              },
	              "error":function(jqXHR,status, errorMsg){
	                  console.log(errorMsg);
	                  console.log("error");
	              }
	          }
	  );//ajax
	}

	function setCatFoodCourts() {
		$.ajax("mapa/CatFoodCourt",
	          {
	              "method":"GET",
	              "data":{},
	              "dataType":"json",
	              "success":function(jsonDoc,status,jqXHR){
										for (i = 0; i < jsonDoc.restaurantes.length; i++) {
											var marker = L.marker([jsonDoc.restaurantes[i].geometry.coordinates[0],
								        jsonDoc.restaurantes[i].geometry.coordinates[1]], { icon: yellowIcon }).addTo(carneAsada);
								      marker.bindPopup(jsonDoc.restaurantes[i].properties.popupContent);
										}

	              },
	              "error":function(jqXHR,status, errorMsg){
	                  console.log(errorMsg);
	                  console.log("error");
	              }
	          }
	  );//ajax
	}

	// handle geolocation api errors
	function positionError(error) {
		var errors = {
			1: "Authorization fails", // permission denied
			2: "Can\'t detect your location", //position unavailable
			3: "Connection timeout" // timeout
		};
		showError("Error:" + errors[error.code]);
	}

	function showError(msg) {
		info.addClass("error").text(msg);
	}
});


/*Este es su especialidad y los tipos son:
        mariscos,carneAsada,baleadas,
        chuletas,comidaChina,hamburguesas,hotdogs,pizza, pollo, sopa*/

//Agregar iconos
var mariscos = L.icon({
    iconUrl: '../assets/Pescado.svg',

    iconSize:     [38, 95], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var carneAsada = L.icon({
    iconUrl: '../assets/Carne Asada.svg',

    iconSize:     [38, 95], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var baleadas = L.icon({
    iconUrl: '../assets/Baleada.svg',

    iconSize:     [38, 95], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var chuletas = L.icon({
    iconUrl: '../assets/Chuletas.svg',

    iconSize:     [38, 95], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var comidaChina = L.icon({
    iconUrl: '../assets/Comida China.svg',

    iconSize:     [38, 95], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var hamburguesas = L.icon({
    iconUrl: '../assets/Hamburguesa.svg',

    iconSize:     [38, 95], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var hotdogs = L.icon({
    iconUrl: '../assets/Hot Dog.svg',

    iconSize:     [38, 95], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var pizza = L.icon({
    iconUrl: '../assets/Pizza.svg',

    iconSize:     [38, 95], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var pollo = L.icon({
    iconUrl: '../assets/Pollo.svg',

    iconSize:     [38, 95], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var sopa = L.icon({
    iconUrl: '../assets/Sopa.svg',

    iconSize:     [38, 95], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var ubicacion = L.icon({
    iconUrl: '../assets/ubicacion.svg',

    iconSize:     [38, 95], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
