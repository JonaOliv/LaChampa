use LaChampadb;
var geojsonDoc = {
    "docnum":1,
    "type": "Feature",
    "properties": {
        "nombre": "Nose 1",
        "amenity": "",
        "popupContent": "",
	      "tipoComida":"Carne Asada"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [14.122947, -87.221605]
    }
};

db.restaurantes.insert(geojsonDoc);

var geojsonDoc = {
    "docnum":2,
    "type": "Feature",
    "properties": {
        "nombre": "Nose 2",
        "amenity": "",
        "popupContent": "",
	      "tipoComida":"Carne Asada"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [14.124609, -87.224002]
    }
};

db.restaurantes.insert(geojsonDoc);

var geojsonDoc = {
    "docnum":3,
    "type": "Feature",
    "properties": {
        "nombre": "cafeteria continua al gimnasio universitario",
        "amenity": "cafeteria",
        "popupContent": "Variedad de comidas",
	      "tipoComida":"Variada"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [14.054756, -87.249377]
    }
};

db.restaurantes.insert(geojsonDoc);

var geojsonDoc = {
    "docnum":4,
    "type": "Feature",
    "properties": {
        "nombre": "Baleadas express",
        "amenity": "local",
        "popupContent": "especialidad en baleadas y comidas tipicas",
	      "tipoComida":"Tipica"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [14.062562, -87.222721]
    }
};

db.restaurantes.insert(geojsonDoc);

var geojsonDoc = {
    "docnum":5,
    "type": "Feature",
    "properties": {
        "nombre": "Asados el Gordo",
        "amenity": "local",
        "popupContent": "especialidad chuletas de cerdo y carne asada",
	      "tipoComida":"Carne Asada"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [14.064706, -87.218913]
    }
};

db.restaurantes.insert(geojsonDoc);

var geojsonDoc = {
    "docnum":6,
    "type": "Feature",
    "properties": {
        "nombre": "terraza y restaurante bella vista",
        "amenity": "local",
        "popupContent": "terraza y restaurante bella vista </br> Especialidad en comidas Gourmed",
	      "tipoComida":"bufete"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [14.061223, -87.239148]
    }
};

db.restaurantes.insert(geojsonDoc);


var usuarios = {
 "usuario":"alucard",
 "correo":"",
 "contrasenia":"",
 "favoritos":[],
 "votados":[8]
};
var usuarios = {
 "usuario":"hellsing",
 "correo":"hellsing@noche.sangre",
 "contrasenia":"",
 "favoritos":[],
 "votados":[8]
};
db.usuarios.insert(usuarios);
