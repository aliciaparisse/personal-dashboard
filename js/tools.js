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
	// colors = [
	// 	"#D0EDF1", //00 - Normal blue
	// 	"#8AB7BC", //01 - First Dark shade of Blue
	// 	"#95AAAC", //02 - Second Dark shade of Blue
	// 	"#E2F4F6", //03 - First Light Shade of Blue
	// 	"#F0F9FA", //04 - Second Light Shade of Blue
	// 	"#FFAE32", //05 - Normal Orange
	// 	"#E59C2D", //06 - First Dark Shade or Orange
	// 	"#CC8B28", //07 - Second Dark Shade of Orange
	// 	"#FFBE5A", //08 - First Light Shade of Orange
	// 	"#FFD698", //09 - Second Light Shade of Orange 
	// 	"#D3D3D3", //10 - Normal Grey
	// 	"#BDBDBD", //11 - First Dark Shade of Grey
	// 	"#A8A8A8", //12 - Second Dark Shade of Grey
	// 	"#DBDBDB", //13 - First Light Shade of Grey
	// 	"#E9E9E9", //14 Second Light Shade of Grey
 // 	]

 	colors= [ "#6797FB", "#FFAE32", "#BBEA76", "#FF7575", "#9669FE","#FFFF84", "#6797FB"]
 	//Now we assign a table of colors, depending on the number of co,lors needed
 	return colors.slice(0,(nbColors));
}

var getCorrColors = function(color){
	var colors = [
		colorLuminance(color, -0.2),
		color,
		colorLuminance(color, 0.2)
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

var changeExercColor= function(courseName){
	$("."+ courseName).find("div.exerc").css("background", "red");
}