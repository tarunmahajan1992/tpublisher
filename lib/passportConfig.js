var passport=require('passport');
var passportStrategy=require('passport-local').Strategy;
global.global_username="tarun";
global.global_password="kumar";
module.exports=function(app){
	app.use(passport.initialize());
	app.use(passport.session());
	
   // console.log("pass session+initialize");
	
	passport.serializeUser(function(user, done) {
	//console.log("1");
    done(null, user.name);
    });
 
    passport.deserializeUser(function(user, done) {
	//console.log(name);
    done(null,user);
    });
	
	passport.use('login',new passportStrategy(
	function(username,password,done){
		process.nextTick(function(){
			//console.log(username);
			if(username==global_username&&password==global_password){
				var user={name:username,password:password};
			  done(null,user)	;
			}
			else
			done(null,false);
			
			});
		}
		));
		return passport;
}