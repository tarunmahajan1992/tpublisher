var path=require('path');
var multer=require('multer');
var fs=require('fs');
var mkdirp = require('mkdirp');
module.exports={
	pathCheckMiddleware:function(req,res,next){
		var currentDir =  rootDirectory;
	var fileAccessPath=validFileAccessPath_tpub;
    var query = req.query.path || '';
	console.log(query+"here1");
    if (query) {
		requestedPath = path.normalize(path.join(currentDir, query));
		relativePath=path.relative(rootDirectory,requestedPath);
		console.log(requestedPath);
		if(requestedPath.indexOf(fileAccessPath)===0){
			req.validPath=true;
			req.completePath=requestedPath;
			
		}
		else{
		    req.validPath=false;	
		}
		
		}
		next();
		
	},
	requireAuth:function(req, res, next){

  // check if the user is logged in
  if(!req.isAuthenticated()){
    req.session.error = "You need to login to complete this";
    res.redirect('/login');
  }
  next();
},
	uploadMiddleware: multer({rename:function(fieldname,filename){
	               return filename;
	             },
	            onFileUploadStart: function (file) {
                    console.log(file.originalname + ' is starting ...');
					
                  },
                onFileUploadComplete: function (file) {
                     console.log(file.fieldname + ' uploaded to  ' + file.path);
                     done=true;
                   },
				 changeDest: function(dest, req, res) {
					 console.log(path.join('.',req.body.uploadPath)+'change dest');
                      return  path.join('.',req.body.uploadPath); 
                   }
	  }),
	  
	  showFiles:function(req,res){
	var data=[];
	if(req.validPath){
	var currentDir = req.completePath;
	console.log(currentDir);
	fs.readdir(currentDir,function(err,files){
		//if(err) return res.send(JSON.stringify(error));
		data.push({currentPath:currentDir,relativePath:relativePath});
		files
		 .filter(function(file){
			 return true
			 }).forEach(function(file){
				  try {
                //console.log("processing ", file);
                var isDirectory = fs.statSync(path.join(currentDir,file)).isDirectory();
                if (isDirectory) {
                  data.push({ Name : file, IsDirectory: true, Path : path.join(relativePath, file)  });
                } else{ 
				  var ext = path.extname(file);
                  data.push({ Name : file, Ext : ext, IsDirectory: false, Path : path.join(relativePath, file) });
                }

        } catch(e) {
          console.log(e); 
        }      
				 
				 });
				 
				 res.json(data);
		});
	}
	else
	{
	 req.session.blockedPath='/files';
	 req.session.error="Not authorized to access this path/ Invalid path";
	 res.redirect('/login');
	}
		
	},
	
	filepathCheck:function(req,res){
	      console.log(req.completePath);
		 if(!req.validPath) return res.json({error:'you are not authorised to write here'});
		 try{
		 fs.stat(req.completePath,function(error,stats){
			 if(error) res.json({error:'invalid path'});
			 else if(stats.isDirectory) res.json({success:true});
			  else{res.json({error:'invalid path'})};
			 });
		 }
		 catch(e){
			console.log("error");
		 }
		 
	 },
	
	removeFile:function(req,res){
	   console.log(req.validPath);
		 if(req.validPath){
			 console.log(req.completePath);
			fs.unlink(req.completePath,function(error){
				if(error) return res.json({error:"error deleting"});
				res.json({message:"File's successfully deleted"});
				});
		 }
		 else{
			 res.json({message:"Some Error occurred. Contact system administrator"});
			 }
		 	
	},
	
	renameFile:function(req,res){
		console.log(req.query.oldPath);
		oldPath=path.join(rootDirectory,req.query.oldPath);
		newPath=path.join(path.dirname(oldPath),'/',req.query.newName);
		console.log(newPath);
		if(res.validPath){
		fs.rename(oldPath,newPath,function(error){
			if(error){
				 console.log(JSON.stringify(error));
				 return res.json({error:"error while renaming file/ file doesn't exists"});
			}
			res.json({success:"renamed"});	
		})	
		}
		else{
			 res.json({error:"not authorised to rename this file"});
		}
	},
	makedir:function(req,res){
		var dirStruct=req.query.dirStruct;
		dirStruct=path.join(rootDirectory,dirStruct);
		
		mkdirp(dirStruct, function (err) {
    	if (err) res.json({message:"Some error occurred."});
    	else res.json({message:"Folder successfully created"});
		});
		
		
	},
	removeDir:function(req,res){
		if(req.validPath){
			var dirPath=path.join(rootDirectory,req.query.path);
			fs.rmdir(dirPath,function(error){
			if(error){
			return res.json({error:"directry deletion error/ may not be empty"});	
			}
			res.json({message:"Directory successfully deleted"});
			})
		}
		else{
		return res.json({message:"Error in deletion.Contact System administrator"});	
		}
	}
	
	
	
}