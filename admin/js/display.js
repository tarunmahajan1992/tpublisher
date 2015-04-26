window.onload=function(){
//alert("tarun");
HTMLElement.prototype.removeClass=function(remove){
			var newClasses=[];
			var classes=this.className.split(" ");
			for(var i=0;i<classes.length;i++){
				//alert(classes[i]);
				if(classes[i]!==remove)
				newClasses.push(classes[i]);
			}
			var classString=newClasses.join(" ");
			this.className=classString;
		};
		
		var checkBoxList=function (){
			var checkBoxes=document.getElementById("items").childNodes;
			var checkBoxNames=[];
			//alert();
			var count=0;
			for(var i=0;i<checkBoxes.length;i++){
				if(checkBoxes[i].nodeType==1){
					checkBoxes[i].removeClass("checked");
				alert(checkBoxes[i].className);
			    //alert(checkBoxes[i].childNodes[0]+count++);
				var inputItem=checkBoxes[i].childNodes;
				for(var j=0;j<inputItem.length;j++){
					//alert(inputItem.length);
				if((inputItem[j].checked)){
					checkBoxNames[j]=inputItem[j].id;
					//alert(inputItem[j].id+"tttt");
					checkBoxes[i].className+=" checked";
				}
				}
			}
			}
			return checkBoxNames;
		};
		document.getElementById("dropdownMenu1").onclick=function(){
			var items=document.getElementById("items");
			     if(items.className.split(" ").indexOf("hidden1")>-1){
				   items.removeClass("hidden1");
				  items.className+=" visible";
				  checkBoxList();
				 }
				  else
				  {
					 items.removeClass("visible");
				  items.className+=" hidden1"; 
				  }
				  
				  };
}// JavaScript Document