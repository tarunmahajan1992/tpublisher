angular.module("myapp", ['ngRoute'])
    .controller("HelloController",['$scope','$http','fileUpload', function($scope,$http,fileUpload) {
		
       $scope.files=[];
	   $scope.message=null;
	   $scope.currentPath=null;
	   $scope.uploadFilePath=null;
	   $scope.relativePath='/public';
	   $scope.list=[];
	    $scope.listDir=[];
	   $scope.fileRequest=function(path){
	   params={path:path};
	   $http({
	    url:'/files',
	   	method:'GET',
		params:params
	   })
	   .success(function(files){
		  // console.log(files);
		   $scope.files=files;
		   $scope.currentPath=files[0].currentPath;
		   $scope.message=files[0].relativePath;
		   $scope.relativePath=files[0].relativePath;
		   
		   console.log($scope.relativePath);
		   if(files.length==1){
			   $scope.message+=' Empty Directory';
		   }
		    $scope.files.shift();
		   })
		.error(function(error){
			$scope.message=error;
			})
	   }
		
		/*window.onload=function(){
			console.log('wreet');*/
			$scope.fileRequest($scope.relativePath);
		
		$scope.exploreDirectory=function(path){
			if(path==null){
			path=$scope.relativePath;	
			}
			console.log(path+'explore Directort');
			$scope.fileRequest(path);
			fileuploadPath=$scope.relativePath;
		}
		
		$scope.exploreDirectoryRel=function(path){
			path=$scope.relativePath+path;
			console.log(path+'explore directory rel');
			$scope.fileRequest(path);
			fileuploadPath=$scope.relativePath;
		}
		
		$scope.showFile=function(path){
			console.log(path);
		   	window.open(path.substring(6),'_blank')
		}
		$scope.addRemoveFromList=function(path){
			console.log("in fun block");
			$scope.listDir=[];
			if($scope.list.indexOf(path)==-1){
				$scope.list.push(path);	
				console.log("added");
			}
			else{
				var index=$scope.list.indexOf(path);
				$scope.list.splice(index,1);
				console.log("removed");
			}
			console.log(JSON.stringify($scope.list));
			
		}
		
		$scope.addRemoveFromListDir=function(path){
			$scope.list=[];
			if($scope.listDir.indexOf(path)==-1){
				$scope.listDir.push(path);	
				console.log("added");
			}
			else{
				var index=$scope.listDir.indexOf(path);
				$scope.listDir.splice(index,1);
				console.log("removed");
			}
			console.log(JSON.stringify($scope.listDir));
			
		}
		$scope.inList=function(path){
			if($scope.list.indexOf(path)==-1){
				
				return " ";	
			}
			else{
				
				 return "selected";
			}
		};
		$scope.inListDir=function(path){
			if($scope.listDir.indexOf(path)==-1){
				
				return " ";	
			}
			else{
				 return "selected";
			}
		};
		
		$scope.downloadFiles=function(){
			console.log("download");
			var len=$scope.list.length
			if(len>1){
			bootbox.alert("you can download file one at at a time. only first selected file will be downloaded");
			}
			if(len!=0){
				path='/downloadFile?path='+$scope.list[0];
			window.open(path,'_blank');	
			}
			 else{
				   bootbox.alert("No File selected");
			   }
			
		}
		
		$scope.deleteDir=function(){
			    if($scope.listDir.length>0){
				bootbox.confirm("Are you sure you want to delete this Directory?"+
				"Make sure it is empty. Otherwise server will throw error", function(result) {
                if(result){
					 $scope.listDir.forEach(function(path){
						console.log(path+"path");
						var params={path:path};
						$http({
							url:'/removeDir',
							method:'GET',
							params:params
							});
					 })
					$scope.listDir=[];
					$scope.exploreDirectory();
				}
                   }); }
				    else{
				   bootbox.alert("No Folder selected");
			   }
		}
		$scope.delete=function(){
			   if($scope.list.length){
				bootbox.confirm("Are you sure you want to delete these files?", function(result) {
                if(result){
					 $scope.list.forEach(function(path){
						console.log(path+"path");
						var params={path:path};
						$http({
							url:'/removeFile',
							method:'GET',
							params:params
							});
					 })
					$scope.list=[];
					$scope.exploreDirectory();
				}
                   }); 
			   }
			   else{
				   bootbox.alert("No File selected");
			   }
		}
		$scope.newFolder=function(){
			console.log("hrllo l");
				bootbox.dialog({
                title: "Create new Folder",
                message: '<div class="row" ng-app="myapp" ng-controller="HelloController">  ' +
                    '<div class="col-md-12"> ' +
                    '<form class="form-horizontal"> ' +
                    '<div class="form-group"> ' +
                    '<label class="col-md-4 control-label" for="name">Folder Name</label> ' +
                    '<div class="col-md-4"> ' +
                    '<input  name="name" type="text" placeholder="/foldername" class="form-control input-md" id="foldername"> ' +
                    '<span class="help-block">Here goes foldername</span> </div>' +
                    '</div>  </div>' +
                    '</form> </div>'+ 
					 '</div>',
                buttons: {
                    success: {
                        label: "Create Folder",
                        className: "btn-success",
                        callback: function () {
							var foldername=angular.element("#foldername").val();
							foldername=$scope.relativePath.concat(foldername);
							var params={dirStruct:foldername};
							console.log(foldername);
                           $http.get('/makedir',{params:params})
						   .success(function(data){
							   console.log(data);
							   })
							   .error(function(error){
								console.log(error) ;  
							   });
                            
                        }
                    }
                }
            }
        );
				
				
			
		}
		
		$scope.uploadFile = function(){
        var file = $scope.myFile;
		var uploadPath=$scope.relativePath;
		console.log(uploadPath+"upload path");
        console.log('file is ' + JSON.stringify(file)+" "+uploadPath);
        var uploadUrl = "/upload";
        fileUpload.uploadFileToUrl(file, uploadUrl,uploadPath);
        }
		
				  } ])
				 /* .config(function($routeProvider){
					  $routeProvider
					    .when('/',{
							templateUrl:'template/fileTraversal.html'
							})
					  	.when('/fileTraversal',{
							templateUrl:'template/fileTraversal.html'
							})
						 .when('/uploadFile',{
							 templateUrl:'template/uploadFile.html',
							 controller:'HelloController'
							 })
							  
					  })*/
					.directive('fileModel', ['$parse', function ($parse) {
                       return {
                       restrict: 'A',
                       link: function(scope, element, attrs) {
                          var model = $parse(attrs.fileModel);
                          var modelSetter = model.assign;
            
                          element.bind('change', function(){
                          scope.$apply(function(){
                           modelSetter(scope, element[0].files[0]);
                            });
                           });
                           }
                          };
                          }])
					  .service('fileUpload', ['$http', function ($http) {
	                 	this.uploadFileToUrl = function(file, uploadUrl,uploadPath){
		              	var fd = new FormData();
			           console.log(uploadPath);
						fd.append('uploadPath',uploadPath);
						 fd.append('filename', file);
			            $http.post(uploadUrl, fd, {
			         	transformRequest: angular.identity,
			         	headers: {'Content-Type': undefined}
			             })
			           .success(function(data){
						   console.log(JSON.stringify(data));
		                  	})
		            	.error(function(){
			               });
		                  }
	                    }])
				  
		
				