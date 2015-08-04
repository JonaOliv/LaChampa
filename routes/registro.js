var express = require('express');
var registroRouter = express.Router();
var bcrypt = require('bcrypt');

/*
var usuarios = {
 "usuario":"hellsing",
 "correo":"hellsing@noche.sangre",
 "contrasenia":"",
 "favoritos":[23],
 "votados":[]
};
db.usuarios.insert(usuarios);
*/

function registro(db){
    var user="";
    var pswd="";
    var correo="";
    var cpswd="";
    var usuarios = db.collection("usuarios");

    registroRouter.get("/",function(req,res){
      res.render("registro", {});
    });

    registroRouter.post("/registro/:user/:pswd/:cpswd/:correo",function(req,res){
      var ningunError=true;
      var mensaje=[];
      user=req.params.user;
      pswd=req.params.pswd;
      cpswd=req.params.cpswd;
      correo=req.params.correo;

      if (pswd.localeCompare(cpswd)!=0) {
        ningunError=false;
        mensaje.push("Contraseñas no coinciden");
      }

      var query = {$or:[{"correo":{$eq:correo}},{"usuario":{$eq:user}}]};
      var proyeccion = {"correo":1,"usuario":1,"contrasenia":1,"_id":0};
      usuarios.find(query,proyeccion).toArray(function(err, vUsuarios){
        if(!err){
          if (vUsuarios.length>0 || (!ningunError)) {
            mensaje.push("Usuario o correo existente");
            res.status(200).json({"mensaje":mensaje,"mostrar":0});
          }else{
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(pswd, salt, function(err, hash) {
                    console.log("LLega aqui bcrypt");
                    var doc = {"usuario":user, "correo":correo,"contrasenia":hash,"favoritos":[],"votados":[]};
                    usuarios.insert(doc, {}, function(err, records){
                      res.status(200).json({"mensaje":mensaje,"mostrar":1,"correo":correo});
                      console.log("Record added as "+records);
                    });
                });//bcrypt.hash
            });//bcrypt.genSalt
          }
        }else{
          console.log(err);
        }// if else !err
      }); // find toarray


    });

    return registroRouter;
}

module.exports = registro;
