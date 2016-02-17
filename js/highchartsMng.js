function getColors(nbColors){
	colors = [
		"#D0EDF1", //00 - Normal blue
		"#8AB7BC", //01 - First Dark shade of Blue
		"#95AAAC", //02 - Second Dark shade of Blue
		"#CFE1E3", //03 - First Light Shade of Blue
		"#DDEAEB", //04 - Second Light Shade of Blue
		"#FFAE32", //05 - Normal Orange
		"#E59C2D", //06 - First Dark Shade or Orange
		"#CC8B28", //07 - Second Dark Shade of Orange
		"#FFBE5A", //08 - First Light Shade of Orange
		"#FFD698", //09 - Second Light Shade of Orange 
		"#D3D3D3", //10 - Normal Grey
		"#BDBDBD", //11 - First Dark Shade of Grey
		"#A8A8A8", //12 - Second Dark Shade of Grey
		"#DBDBDB", //13 - First Light Shade of Grey
		"#E9E9E9", //14 Second Light Shade of Grey
 	]

 	//Now we assign a table of colors, depending on the number of colors needed
 	if (nbColors <=3){
 		return [colors[0],
 				colors[5],
 				colors[10]];
 	}
 	else if (nbColors <=6){
 		return [colors[4],
 				colors[0],
 				colors[9],
 				colors[5],
 				colors[14],
 				colors[10]];
 	}
 	else if (nbColors <=9){
 		return [colors[4],
 				colors[0],
 				colors[1],
 				colors[9],
 				colors[5],
 				colors[6],
 				colors[14],
 				colors[10],
 				colors[11]];
 	}
 	else if (nbColors <=12){
 		return [colors[4],
 				colors[0],
 				colors[1],
 				colors[2],
 				colors[9],
 				colors[5],
 				colors[6],
 				colors[7],
 				colors[14],
 				colors[10],
 				colors[11],
 				colors[12]];
 	}

 	else if (nbColors <=15){
 		return [colors[3],
 				colors[4],
 				colors[0],
 				colors[1],
 				colors[2],
 				colors[8],
 				colors[9],
 				colors[5],
 				colors[6],
 				colors[7],
 				colors[13],
 				colors[14],
 				colors[10],
 				colors[11],
 				colors[12]];
 	}
 	else if (nbColors > 15){
 		//Return highcharts colors ?
 		return [colors[3],
 				colors[4],
 				colors[0],
 				colors[1],
 				colors[2],
 				colors[8],
 				colors[9],
 				colors[5],
 				colors[6],
 				colors[7],
 				colors[13],
 				colors[14],
 				colors[10],
 				colors[11],
 				colors[12]];
 	}
}