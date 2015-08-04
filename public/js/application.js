$(function() {
	// variables para los filtros
	var carneAsada = new L.LayerGroup();
	var mariscos = new L.LayerGroup();
	var baleadas = new L.LayerGroup();
	var foodcourt = new L.LayerGroup();
	var chuletas = new L.LayerGroup();
	var comidaChina = new L.LayerGroup();
	var hamburguesas = new L.LayerGroup();
	var hotdogs = new L.LayerGroup();
	var pizza = new L.LayerGroup();
	var pollo = new L.LayerGroup();
	var sopa = new L.LayerGroup();
	var vLayers = [carneAsada,mariscos,baleadas,foodcourt,chuletas,comidaChina,
		hamburguesas,hotdogs,pizza,pollo,sopa];

	var baseLayers={};
	var overlays = {
			"Mariscos": mariscos,
			"Carnes Asadas": carneAsada,
			"Baleadas": baleadas,
			"Chuletas": chuletas,
			"Comida China": comidaChina,
			"Hamburguesas": hamburguesas,
			"HotDogs": hotdogs,
			"Pizza": pizza,
			"Pollo": pollo,
			"Sopas": sopa,
			"FoodCourts": foodcourt
		};
		//tambien uso la funcion setMarker y lo que contiene
 //---------------------------------------
 //variables para el panel
 var vDocnum = [];
 var vCombobox = [];
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


	var mariscosIcon = L.icon({
	    iconUrl: '../assets/Pescado.svg',

	    iconSize:     [38, 95], // size of the icon
	    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
	    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
	});

	var carneAsadaIcon = L.icon({
	    iconUrl: '../assets/CarneAsada.svg',

	    iconSize:     [38, 95], // size of the icon
	    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
	    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
	});

	var baleadasIcon = L.icon({
	    iconUrl: '../assets/Baleada.svg',

	    iconSize:     [38, 95], // size of the icon
	    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
	    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
	});

	var chuletasIcon = L.icon({
	    iconUrl: '../assets/Chuletas.svg',

	    iconSize:     [38, 95], // size of the icon
	    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
	    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
	});

	var comidaChinaIcon = L.icon({
	    iconUrl: '../assets/ComidaChina.svg',

	    iconSize:     [38, 95], // size of the icon
	    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
	    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
	});

	var hamburguesasIcon = L.icon({
	    iconUrl: '../assets/Hamburguesa.svg',

	    iconSize:     [38, 95], // size of the icon
	    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
	    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
	});

	var hotdogsIcon = L.icon({
	    iconUrl: '../assets/HotDog.svg',

	    iconSize:     [38, 95], // size of the icon
	    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
	    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
	});

	var pizzaIcon = L.icon({
	    iconUrl: '../assets/Pizza.svg',

	    iconSize:     [38, 95], // size of the icon
	    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
	    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
	});

	var polloIcon = L.icon({
	    iconUrl: '../assets/Pollo.svg',

	    iconSize:     [38, 95], // size of the icon
	    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
	    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
	});

	var sopaIcon = L.icon({
	    iconUrl: '../assets/Sopa.svg',

	    iconSize:     [38, 95], // size of the icon
	    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
	    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
	});

	var ubicacionIcon = L.icon({
	    iconUrl: '../assets/Ubicacion.svg',

	    iconSize:     [38, 95], // size of the icon
	    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
	    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
	});


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
			icon: ubicacionIcon
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
		userMarker.bindPopup("<b>Usted esta aqui</b>").openPopup();
		//funcion que pone los restaurantes en el mapa por categorias
    setMarker();
	}

  function setMarker() {
		setCatMariscos();
		setCatCarneAsada();
		setCatBaleadas();
		setCatChuletas();
		setCatComidaChina();
		setCatHamburguesa();
		setCatHotdogs();
		setCatPizza();
		setCatPollo();
		setCatSopa();
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
										$( "#nombreLocal" ).text(jsonDoc.restaurantes[0].properties.nombre);//Puesto de Venta
										$("#divFoodcourt").hide();
										//$("#divFoodcourt").show();
										$( "#descripcion" ).text(jsonDoc.restaurantes[0].properties.popupContent);
										$( "#puntos" ).text("Likes dados: "+jsonDoc.restaurantes[0].properties.rating);
										$("#preciosLocales").empty();
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
			$.ajax("panel/Voto/"+vDocnum[number],
		          {
		              "method":"GET",
		              "data":{},
		              "dataType":"json",
		              "success":function(jsonDoc,status,jqXHR){

		              },
		              "error":function(jqXHR,status, errorMsg){
											console.log("error");
		                  console.log(errorMsg);
		              }
		          }
		  );//ajax
		});//$("#like").on('click'172.16.217.32
	}

	function comboboxPanel(selected){
		$.ajax("panel/FoodCourt/Puesto/"+vDocnum[number],
	          {
	              "method":"GET",
	              "data":{},
	              "dataType":"json",
	              "success":function(jsonDoc,status,jqXHR){
									$( "#descripcion" ).text(jsonDoc.restaurantes[0].properties.popupContent);
									$( "#puntos" ).text("Likes dados: "+jsonDoc.restaurantes[0].properties.rating);
									//menu
									$("#preciosLocales li").remove();
									for (i = 0; i < jsonDoc.restaurantes[0].properties.menu.length; i++) {
										$("#preciosLocales").append("<li class='ui-li' data-theme='c'><span>"
										+jsonDoc.restaurantes[0].properties.menu[i].nombreComida+" "
										+jsonDoc.restaurantes[0].properties.menu[i].precio
										 +"</span></li>");
									}
	              },
	              "error":function(jqXHR,status, errorMsg){
										console.log("error");
	                  console.log(errorMsg);
	              }
	          }
	  );//ajax
	}

	function setPanelFoodCourt(number){
		$.ajax("panel/FoodCourt/"+vDocnum[number],
	          {
	              "method":"GET",
	              "data":{},
	              "dataType":"json",
	              "success":function(jsonDoc,status,jqXHR){
										$( "#nombreLocal" ).text("Puesto de Venta");
										$("#divFoodcourt").show();

										$( "#descripcion" ).text(jsonDoc.restaurantes[0].properties.popupContent);
										$( "#puntos" ).text("Likes dados: "+jsonDoc.restaurantes[0].properties.rating);
										//combobox
										$("#cmbFoodcourt").empty();
										$("#cmbFoodcourt").append("<option value='"+
										jsonDoc.restaurantes[0].docnum+"' selected='selected'>"+
										jsonDoc.restaurantes[0].properties.nombre+
										 "</option>");

										for (i = 1; i < jsonDoc.restaurantes[0].properties.menu.length; i++) {
											 $("#cmbFoodcourt").append("<option value='"+
	 										jsonDoc.restaurantes[i].docnum+"'>"+
	 										jsonDoc.restaurantes[i].properties.nombre+
	 										 "</option>");
										}
										//cuando cambie el combobox
										$('#cmbFoodcourt').change(function () {
										  var optionSelected = $('#cmbFoodcourt').find('option:selected');
										  var optValueSelected = optionSelected.val();
											comboboxPanel(optValueSelected);
										});
										//------------------------------------------
										//menu
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
			var optionSelected = $('#cmbFoodcourt').find('option:selected');
			var optValueSelected = optionSelected.val();
			$.ajax("panel/Voto/"+optValueSelected,
		          {
		              "method":"GET",
		              "data":{},
		              "dataType":"json",
		              "success":function(jsonDoc,status,jqXHR){

		              },
		              "error":function(jqXHR,status, errorMsg){
											console.log("error");
		                  console.log(errorMsg);
		              }
		          }
		  );//ajax
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
								        jsonDoc.restaurantes[i].geometry.coordinates[1]], { icon: mariscosIcon }).addTo(mariscos);
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
								        jsonDoc.restaurantes[i].geometry.coordinates[1]], { icon: carneAsadaIcon }).addTo(carneAsada);
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
								        jsonDoc.restaurantes[i].geometry.coordinates[1]], { icon: baleadasIcon }).addTo(baleadas);
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

	function setCatChuletas() {
		$.ajax("mapa/setCatChuletas",
	          {
	              "method":"GET",
	              "data":{},
	              "dataType":"json",
	              "success":function(jsonDoc,status,jqXHR){
										for (i = 0; i < jsonDoc.restaurantes.length; i++) {
											var marker = L.marker([jsonDoc.restaurantes[i].geometry.coordinates[0],
								        jsonDoc.restaurantes[i].geometry.coordinates[1]], { icon: chuletasIcon }).addTo(chuletas);
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

	function setCatComidaChina() {
		$.ajax("mapa/setCatComidaChina",
	          {
	              "method":"GET",
	              "data":{},
	              "dataType":"json",
	              "success":function(jsonDoc,status,jqXHR){
										for (i = 0; i < jsonDoc.restaurantes.length; i++) {
											var marker = L.marker([jsonDoc.restaurantes[i].geometry.coordinates[0],
								        jsonDoc.restaurantes[i].geometry.coordinates[1]], { icon: comidaChinaIcon }).addTo(comidaChina);
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

	function setCatHamburguesa() {
		$.ajax("mapa/setCatHamburguesa",
	          {
	              "method":"GET",
	              "data":{},
	              "dataType":"json",
	              "success":function(jsonDoc,status,jqXHR){
										for (i = 0; i < jsonDoc.restaurantes.length; i++) {
											var marker = L.marker([jsonDoc.restaurantes[i].geometry.coordinates[0],
								        jsonDoc.restaurantes[i].geometry.coordinates[1]], { icon: hamburguesasIcon }).addTo(hamburguesas);
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

	function setCatHotdogs() {
		$.ajax("mapa/setCatHotdogs",
						{
								"method":"GET",
								"data":{},
								"dataType":"json",
								"success":function(jsonDoc,status,jqXHR){
										for (i = 0; i < jsonDoc.restaurantes.length; i++) {
											var marker = L.marker([jsonDoc.restaurantes[i].geometry.coordinates[0],
												jsonDoc.restaurantes[i].geometry.coordinates[1]], { icon: hotdogsIcon }).addTo(hotdogs);
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

	function setCatPizza() {
		$.ajax("mapa/setCatPizza",
						{
								"method":"GET",
								"data":{},
								"dataType":"json",
								"success":function(jsonDoc,status,jqXHR){
										for (i = 0; i < jsonDoc.restaurantes.length; i++) {
											var marker = L.marker([jsonDoc.restaurantes[i].geometry.coordinates[0],
												jsonDoc.restaurantes[i].geometry.coordinates[1]], { icon: pizzaIcon }).addTo(pizza);
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

	function setCatPollo() {
		$.ajax("mapa/setCatPollo",
						{
								"method":"GET",
								"data":{},
								"dataType":"json",
								"success":function(jsonDoc,status,jqXHR){
										for (i = 0; i < jsonDoc.restaurantes.length; i++) {
											var marker = L.marker([jsonDoc.restaurantes[i].geometry.coordinates[0],
												jsonDoc.restaurantes[i].geometry.coordinates[1]], { icon: polloIcon }).addTo(pollo);
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

	function setCatSopa() {
		$.ajax("mapa/setCatSopa",
						{
								"method":"GET",
								"data":{},
								"dataType":"json",
								"success":function(jsonDoc,status,jqXHR){
										for (i = 0; i < jsonDoc.restaurantes.length; i++) {
											var marker = L.marker([jsonDoc.restaurantes[i].geometry.coordinates[0],
												jsonDoc.restaurantes[i].geometry.coordinates[1]], { icon: sopaIcon }).addTo(sopa);
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
								        jsonDoc.restaurantes[i].geometry.coordinates[1]], { icon: yellowIcon }).addTo(foodcourt);
								      marker.bindPopup(jsonDoc.restaurantes[i].properties.popupContent);

											var cadena = jsonDoc.restaurantes[i].geometry.coordinates[0]+"_"+jsonDoc.restaurantes[i].geometry.coordinates[1];
											cadena=cadena.replace(/\-|\.|\_/gi,"");
											vDocnum[cadena]=jsonDoc.restaurantes[i].docnum;

											marker.on('click', function(e) {
												$( "#mypanel" ).panel( "open" , {} );

												var cadena = e.latlng.lat+"_"+e.latlng.lng;
												cadena=cadena.replace(/\-|\.|\_/gi,"");
												setPanelFoodCourt(cadena);

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
		//info.addClass("error").text(msg);
		alert(msg);
	}
});


/*Este es su especialidad y los tipos son:
        mariscos,carneAsada,baleadas,
        chuletas,comidaChina,hamburguesas,hotdogs,pizza, pollo, sopa*/
