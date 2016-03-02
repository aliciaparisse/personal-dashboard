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

var getColors = function(nbColors){
	
 	var colorsChosen= [
 		"#6797FB", //Royal Blue
 		"#FFBF48", //Orange
 		"#BBEA76", //Green
 		"#FF7575", //Red/Pink
 		"#9669FE", //Purple
 		"#FFFF84" //Yellow
 		], 
 		colLen = colorsChosen.length;
 	//Now we assign a table of colors, depending on the number of colors needed
 	var colors = []; 
 	//We code the repeating in case there are too few colors
 	if(nbColors<=colLen)
 	{
 		colors = colorsChosen.slice(0,nbColors);
 	}
 	else {
 		for (var i = 0 ; i < Math.floor(nbColors/colLen) ; i++) {
 			colors = colors.concat(colorsChosen);
 		}
 		modu = nbColors%colLen;
 		if(modu > 0) {
 			colors = colors.concat((colorsChosen.slice(0, modu)));
 		}
 	}

 	return colors;
}

var getCorrColors = function(color){
	var colors = [
		color,
		colorLuminance(color, -0.3),
		"#e0e0e0",
	];
	return colors;
}

var colorLuminance = function(hex, lum) {

	// validate hex string
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;

	// convert to decimal and change luminosity
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}

	return rgb;
}

var changeExercColor= function(courseName, colors){
	$("."+ courseName).find("div.exerc.completed").css("background", colors[0]);
	$("."+ courseName).find("div.exerc.begun").css("background", colors[1]);
	$("."+ courseName).find("div.exerc.todo").css("background", colors[2]);
}
