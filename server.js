var http=require('http');
var express=require('express');
var app=express();
var fs=require('fs');
var cookieParser=require('cookie-parser');
var session=require('express-session');
console.log("cookie+session");

var ejs=require('ejs');
var config=require('./lib/configParam');
var path=require('path');
var bodyparser=require('body-parser');

app.use(bodyparser.urlencoded({ extended: false }))
app.use(session({secret:'fhdgfksgdjh', resave:false, saveUninitialized:false}));

app.use(cookieParser('key'));
app.set('views','./views');
app.set('view engine','ejs');




global.rootDirectory=__dirname;
global.validFileAccessPath_tpub=path.normalize(path.join(rootDirectory,'/public'));

var server=http.createServer(app);

var routes=require(rootDirectory+'/controller');
app.use(routes.pathCheckMiddleware);


app.use(express.static(__dirname+'/public'));


var authPaths=require('./controller/authRoutes')(app);

var filePaths=require('./controller/fileRoutes')(app);
app.use(function(req, res, next) {
	console.log(req.user);
    if (req.user == null && req.path.indexOf('/admin') === 0)
    {
        res.redirect('/login');
    }
    next(); 
});
app.use('/admin',express.static(__dirname+'/admin'));




server.listen(config.server_port,config.server_ip_address,function(){
	console.log('listening on port'+config.server_port);
	})