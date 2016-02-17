var getCookie = function(name){
	if(document.cookie.length != 0){
		var cookiesArray = document.cookie.split("; ");
		for (var i = 0 ; i < cookiesArray.length ; i++){
			var nameValueArray = cookiesArray[i].split("=");
			if (nameValueArray[0] == name){

				return nameValueArray[1];
			}
		}
		return "";
	}
	else{
		return undefined;
	}
}

var setCookie = function(key, value){
	document.cookie = key + "=" + value;
}