
var routes=require(rootDirectory+'/controller');
module.exports=function(app){
	
	
	app.get('/files',routes.requireAuth, routes. showFiles);
	app.get('/', function(req,res){
		res.redirect('home.html');
		});
   
	app.post('/upload',routes.requireAuth,function(req,res,next){
		console.log(req.body.uploadPath);
		next();
		},routes.uploadMiddleware,function(req,res){
  if(done==true){
    console.log(req.body);
    res.send("File uploaded.");
  }
});

	 app.get('/filePathCheck',routes.requireAuth,routes.filepathCheck);
	 
	 app.get('/downloadFile',routes.requireAuth,function(req,res){
		 if(!req.validPath) return res.json({error:"not authorised"});
		 res.download(req.completePath);
		 });
	app.get('/removeFile',routes.requireAuth,routes.removeFile);
	app.get('/renameFile',routes.requireAuth,routes.renameFile);
	app.get('/makedir',routes.requireAuth,routes.makedir);
	app.get('/removeDir',routes.removeDir);

}