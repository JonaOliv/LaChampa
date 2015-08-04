var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


function returnApp(db){
    var app = express();

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'hbs');

    // uncomment after placing your favicon in /public
    //app.use(favicon(__dirname + '/public/favicon.ico'));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(require('less-middleware')(path.join(__dirname, 'public')));
    app.use(express.static(path.join(__dirname, 'public')));
    var routes = require('./routes/index.js')(db);
    app.use('/', routes);
    var registro = require('./routes/registro.js')(db);
    app.use('/registro', registro);

    //para llamar a los modulos se usa la funcion require
    // la uri del módulo y debe especificar
    // en el módulo la exportación con
    // module.exports = <<funcion>>
    var mapa = require('./routes/mapa.js')(db);
    app.use('/mapa', mapa);
    var panel = require('./routes/panel.js')(db);
    app.use('/panel', panel);
    // http://localhost:3000/api/v0/obtenerLibros

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    // error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
      app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
          message: err.message,
          error: err
        });
      });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {}
      });
    });

    return app;
}// return app

module.exports = returnApp;
