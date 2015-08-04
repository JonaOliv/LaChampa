var express = require('express');
var indexRouter = express.Router();
var bcrypt = require('bcrypt');

function router(db){
    var user="";
    var pswd="";
    var usuarios = db.collection("usuarios");

    indexRouter.get("/",function(req,res){
      res.render("index", {"user":user,"pswd":pswd});
    });

    indexRouter.post("/login/:user/:pswd",function(req,res){
      user=req.params.user;
      pswd=req.params.pswd;
      var hash;
      var query = {"correo":{$eq:user}};//hay que hacer los querys
      var proyeccion = {"correo":1,"contrasenia":1,"_id":0};
      usuarios.find(query,proyeccion).toArray(function(err, vUsuarios){
        if(!err){
          if (vUsuarios.length>0) {
            hash=vUsuarios[0].contrasenia;
            bcrypt.compare(pswd, hash, function(err, res) {
              // res == true
              if (res) {
                res.render("mapa", {"correo":vUsuarios[0].correo});
              }else{
                res.render("index", {"user":user});
              }
            });//fin bcrypt
          }else{
            console.log("Psa1");
            res.render("index", {"user":user});
          }//if else vUsuarios.length
        }else{
          console.log("Psa2");
          res.render("index", {"user":user});
        }// if else !err
      }); // find toarray
    });

    return indexRouter;
}

module.exports = router;
