var express = require('express');
var panelRouter = express.Router();

var app = require('express')();
var http = require('http').Server(app);

function panel(db){
    var restaurantes = db.collection("restaurantes");

    panelRouter.get("/:docnum",function(req,res){
      var query = {"docnum":{$eq:parseInt(req.params.docnum)}};
      var proy = {"_id":0,"properties":1};
      restaurantes.find(query,proy).toArray(function(err, vRestaurantes){
          if(err){
              res.status(500).json({"error":err});
          }else{
              res.status(200).json({"restaurantes":vRestaurantes});
          }
      }); // find toarray
    });

    panelRouter.get("panel/FoodCourt/:docnum",function(req,res){
      var query = {"lugarAsociado":{$eq:parseInt(req.params.docnum)}};
      var proy = {"_id":0,"properties":1};
      restaurantes.find(query,proy).toArray(function(err, vRestaurantes){
          if(err){
              res.status(500).json({"error":err});
          }else{
              res.status(200).json({"restaurantes":vRestaurantes});
          }
      }); // find toarray
    });

    panelRouter.get("panel/FoodCourt/Puesto/:docnum",function(req,res){
      var query = {"docnum":{$eq:parseInt(req.params.docnum)}};
      var proy = {"_id":0,"properties":1};
      restaurantes.find(query,proy).toArray(function(err, vRestaurantes){
          if(err){
              res.status(500).json({"error":err});
          }else{
              res.status(200).json({"restaurantes":vRestaurantes});
          }
      }); // find toarray
    });

    panelRouter.get("/Voto/:voto/:correo",function(req,res){
      var correo=req.params.correo;
      var usuarios = db.collection("usuarios");
      var query = {$and:[{"correo":{$eq:correo}},{"votados":{$eq:parseInt(req.params.voto)}}]};
      var proy = {"_id":0,"votados":1};
      usuarios.find(query,proy).toArray(function(err, vUsuarios){
          if(err){
              res.status(500).json({"error":err});
              console.log("Error");
          }else{
              console.log("Saludos desde voto");
              if (vUsuarios.length == 0) {
                var where={"docnum":{$eq:parseInt(req.params.voto)}};
                var upd={"$inc":{"properties.rating":1}};
                restaurantes.update(where,upd,function(err, doc){
                    if(err){
                        res.status(500).json({"error":err});
                    }
                }); // update restaurantes
                var where2={"correo":{$eq:correo}};
                var upd2={"$push":{"votados":parseInt(req.params.voto)}};
                usuarios.update(where2,upd2,function(err, doc){
                    if(err){
                        res.status(500).json({"error":err});
                    }
                }); // update usuarios
              }
          }
      });
    });


    return panelRouter;
}

module.exports = panel;
