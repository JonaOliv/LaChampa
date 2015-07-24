var geojsonDoc = {
    "docnum":1,
    "type": "Feature",
    "properties": {
        "nombre": "",
        "amenity": "local",/*puede ser local foodcourt o centrofoodcourt*/
        "lugarAsociado":0,/*si es local o centrofoodcourt sera 0 sino tendra el
        valor del docnum del centrofoodcourt donde se localice*/
        "popupContent": "Viva el mar!",
	      "tipoComida":"mariscos",/*Este es su especialidad y los tipos son:
        mariscos,carneAsada,baleadas,
        chuletas,comidaChina,hamburguesas,hotdogs,pizza, pollo, sopa*/
        "rating":0,
        "menu":[{"nombreComida":"Sopa marinera","precio":"32 lps."},
                {"nombreComida":"","precio":""}]
    },
    "geometry": {
        "type": "Point",
        "coordinates": [14.085630, -87.216547]
    }
};
db.restaurantes.insert(geojsonDoc);

var usuarios = {
 "usuario":"hellsing",
 "correo":"hellsing@noche.sangre",/*no se debe repetir*/
 "contrasenia":"",/*obiviamente encriptada*/
 "favoritos":[23],/*el docnum del local*/
 "votados":[8]/*l docnum del local*/
};
db.usuarios.insert(usuarios);
