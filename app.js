var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.get('/token', function (req, res) {

    const nf_token_url = "https://iconfinder.com/api/v2/oauth2/token";

    request.post(
        nf_token_url,
        { form:{
      grant_type:'jwt_bearer',
      client_id: 'PWtSjDo84yB4v3CwXqFrPB9BT4bVZnNhHV1slHpFEZBQ2lPFDY4flgkcIPqgJN0S',
      client_secret: '65E400G8sEcP2voBlmIwCVmgm2hEkDPN42D3Yj9vDcd2GC5SNAmguT87YVov5aeA'
    }},
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                  console.log(body);
        delete body["token_type"];
        res.send(body);
            } else {
        console.log('error');
      }
      }
  );

});
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


module.exports = app;
