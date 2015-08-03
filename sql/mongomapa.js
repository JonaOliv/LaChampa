
var geojsonDoc = {
    "docnum":50,
    "type": "Feature",
    "properties": {
        "nombre": "Neptuno esta gordo",
        "amenity": "local",
        "lugarAsociado":0,
        "popupContent": "Viva el mar!",
	      "tipoComida":"mariscos",
        "rating":0,
        "menu":[]
    },
    "geometry": {
        "type": "Point",
        "coordinates": [14.085630, -87.216547]
    }
};
db.restaurantes.insert(geojsonDoc);

var geojsonDoc = {
    "docnum":16,
    "type": "Feature",
    "properties": {
        "nombre": "Las Campanas",
        "amenity": "foodcourt",
        "lugarAsociado":15,
        "popupContent": "Pizza al mejor precio",
	      "tipoComida":["Pizza","Tacos"],
        "rating":"",
        "menu":[{"nombreComida":"Pizza","precio":"25 lps."}]
    },
    "geometry": {
        "type": "Point",
        "coordinates": []
    }
};
db.restaurantes.insert(geojsonDoc);

var geojsonDoc = {
    "docnum":17,
    "type": "Feature",
    "properties": {
        "nombre": "Expreso Americano",
        "amenity": "foodcourt",
        "lugarAsociado":15,
        "popupContent": "Cafe delicioso con galletas",
	      "tipoComida":["Cafe"],
        "rating":"",
        "menu":[{"nombreComida":"Capucchino","precio":"32 lps."},
                {"nombreComida":"Late","precio":"33 lps."}]
    },
    "geometry": {
        "type": "Point",
        "coordinates": []
    }
};
db.restaurantes.insert(geojsonDoc);
var geojsonDoc = {
    "docnum":18,
    "type": "Feature",
    "properties": {
        "nombre": "Comida Tipica",
        "amenity": "foodcourt",
        "lugarAsociado":15,
        "popupContent": "Disfrute comidas variadas",
	      "tipoComida":["Hamburguesas","Pupusas","Tortas","Tacos"],
        "rating":"",
        "menu":[{"nombreComida":"Capucchino","precio":"32 lps."},
                {"nombreComida":"Late","precio":"33 lps."}]
    },
    "geometry": {
        "type": "Point",
        "coordinates": []
    }
};
db.restaurantes.insert(geojsonDoc);

var geojsonDoc = {
    "docnum":23,
    "type": "Feature",
    "properties": {
        "nombre": "Marisco y Mariscos",
        "amenity": "local",
        "lugarAsociado":0,
        "popupContent": "Deliciosa sopa de cangrejo",
	      "tipoComida":["mariscos"],
        "rating":"",
        "menu":[{"nombreComida":"Sopa marinera","precio":"32 lps."},
                {"nombreComida":"Cangrejo bailarin","precio":"33 lps."}]
    },
    "geometry": {
        "type": "Point",
        "coordinates": [14.120121, -87.220234]
    }
};
db.restaurantes.insert(geojsonDoc);

var query = {$and:[{"properties.lugarAsociado":{$eq:15}},{"properties.tipoComida":{$eq:"Tacos"}}]};
var proy = {"_id":0,"properties":1,"geometry":1};
db.restaurantes.find(query,proy).pretty();
db.restaurantes.find({"properties.lugarAsociado":{$eq:15}}).pretty();
