$(document).ready(function(){
	$("#upload-div").hide();
	var btn=['#file-traversal-btn','#upload-btn'];
	btn.forEach(function(btn){
		$(btn).on('click',function(){
			if(btn=='#file-traversal-btn'){
				console.log("sdhfkjdsh");
				$("#upload-div").hide();
				$("#file-traversal").show();
				}
				else{
					$("#upload-div").show();
				$("#file-traversal").hide();
				}
			});
			})
			
			<!--$("#newFolderBtn").on('click',function(){});-->
		});