var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var FroalaEditor = require('./node_modules/wysiwyg-editor-node-sdk/lib/froalaEditor.js');
var fs = require('fs');
var upload_image = require("./image_upload.js");
var upload_file = require("./file_upload.js");
var upload_video = require("./video_upload.js");
var flash = require('connect-flash');
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');

var indexRouter = require('./routes/index');
var kdvRouter = require('./routes/kdv');
var adminRouter = require('./routes/admin');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/fleditor', express.static(__dirname + '/node_modules/froala-editor/'));
app.use(express.static(path.join(__dirname, 'bin')));
app.use(require('cookie-parser')());
const expressSession = require('express-session');
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(session({secret: 'keyboard cat'}));
app.use(bodyParser());
app.use(fileUpload());

app.use('/', indexRouter);
app.use('/kdv', kdvRouter);
app.use('/admin',adminRouter);

// File POST handler.
app.post("/file_upload", function (req, res) {
  upload_file(req, function(err, data) {

    if (err) {
      return res.status(404).end(JSON.stringify(err));
    }

    res.send(data);
  });
});

// Image POST handler.
app.post("/image_upload", function (req, res) {
  upload_image(req, function(err, data) {

    if (err) {
      console.log(err);
      console.log('có lỗi');
      return res.status(404).end(JSON.stringify(err));
      
    }
    
    var millisecondsToWait = 2000;
    setTimeout(function() {
    
    res.send(data);
    
    }, millisecondsToWait);
    
  });
  
});

// Video POST handler.
app.post("/video_upload", function (req, res) {
  upload_video(req, function(err, data) {

    if (err) {
      return res.status(404).end(JSON.stringify(err));
    }

    res.send(data);
  });
});

// Create folder for uploading files.
var filesDir = path.join(path.dirname(require.main.filename), "uploads");

if (!fs.existsSync(filesDir)){
  fs.mkdirSync(filesDir);
}

// // Listen to the delete request.
// app.post('/delete_image', function (req, res) {

//   // Do delete.
//   FroalaEditor.Image.delete(req.body.src, function(err) {

//     if (err) {
//       return res.status(404).end(JSON.stringify(err));
//     }

//     return res.end();
//   });
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

