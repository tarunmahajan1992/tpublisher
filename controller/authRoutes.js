
module.exports=function(app){
	var passport=require(rootDirectory+'/lib/passportConfig')(app);

app.post('/login',passport.authenticate('login',{
	successRedirect:'/',
	failureRedirect: '/login'
}));
app.post('/changePassword',function(req,res){
	if(req.body.username==global_username&&req.body.password==global_password){
	global_username=req.body.new_username;
	global_password=req.body.new_password;
	res.statusCode=200;
	message="success. Login Again to continue"
	res.render('login',{message:message});
	}
	else{
		res.statusCode=404;
	    message="Username/password not matched.Try Again";	
		res.render('login',{message:message,messageError:""});

	}
})

app.get('/login',function(req,res){
	var message;
	if(req.session.error) message=req.session.error;
	else message="login";
	res.render('login',{message:message});
	});
	
app.get('/logout',function(req,res){
	req.logout();
   res.redirect('/');
	});
}