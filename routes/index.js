var express = require('express');
var indexRouter = express.Router();
var bcrypt = require('bcrypt');

function router(db){
    var user="";
    var pswd="";
    var usuarios = db.collection("usuarios");

    indexRouter.get("/",function(req,res){
      res.render("index", {});
    });

    indexRouter.post("/login/:user/:pswd",function(req,res){
      user=req.params.user;
      pswd=req.params.pswd;
      var hash;
      var query = {$or:[{"correo":{$eq:user}},{"usuario":{$eq:user}}]};//hay que hacer los querys
      var proyeccion = {"usuario":1,"correo":1,"contrasenia":1,"_id":0};
      usuarios.find(query,proyeccion).toArray(function(err, vUsuarios){
        if(!err){
          if (vUsuarios.length>0) {
            hash=vUsuarios[0].contrasenia;
            bcrypt.compare(pswd, hash, function(err, resp) {
              // res == true
              if (resp) {
                //res.render("mapa", {"correo":vUsuarios[0].correo});
                console.log(vUsuarios[0].correo);
                res.status(200).json({"correo":vUsuarios[0].correo,"mostrar":1});
              }else{
                //res.render("index", {"user":user});
                res.status(200).json({"correo":"NaN","mostrar":0});
              }
            });//fin bcrypt
          }else{
            console.log("Error");
            console.log(err);
          }//if else vUsuarios.length
        }else{
          console.log("Error");
          console.log(err);
        }// if else !err
      }); // find toarray
    });

    return indexRouter;
}

module.exports = router;
