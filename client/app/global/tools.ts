/**
 * Created by parisse on 16.3.2016.
 */

export class Tools {
    //Function getColors
    //@param :  nbColors, integer.
    //@return : colors, array.
    //@desc :   this function gives out an array filled with as many colors as asked in nbColors.
    static getColors (nbColors){

        var colorsChosen= [
                "#6797FB", //Royal Blue
                "#FFBF48", //Orange
                "#BBEA76", //Green
                "#FF7575", //Red/Pink
                "#9669FE", //Purple
                "#FFFF84" //Yellow
            ],
            colLen = colorsChosen.length,
            modu;
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

    //Function getCorrColors
    //@param :  color, hexadecimal color as a string.
    //@return : colors, array.
    //@desc :   getting back a 3 colors array containg the param color, one 30% more dark and grey.
    static getCorrColors (color){
        var self =this,
            colors = [
                color,
                self.colorLuminance(color, -0.3),
                "#e0e0e0",
            ];
        return colors;
    }

    //Function colorsLuminance
    //@params : hex;lum, int;float.
    //@return : rgb, hexadecimal color as a string.
    //@desc :   taking a color and a luminance and returning a new color.
    //          The color is lighter if lum is positive, darker if lum is negative.
    static colorLuminance (hex, lum) {

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

    //Function changeExercColor
    //@param :  courseName, string.
    //@param :  colors, array. Array of 3 colors.
    //@desc :   Using jquery to change the color of the activity divs according to its status.
    static changeExercColor(courseName, colors){
        (<any>$("."+ courseName)).find("div.exerc.completed").css("background", colors[0]);
        (<any>$("."+ courseName)).find("div.exerc.begun").css("background", colors[1]);
        (<any>$("."+ courseName)).find("div.exerc.todo").css("background", colors[2]);
    }

    static login(username,password,successCb,errorCb){
        (<any>$).ajax({
            url: 'https://hy-canary.testmycode.io/oauth/token',
            method: "post",
            data: {
                client_id:"228e3c5cfc33605da6919b536b51a4d3b4a84ac06aa6f5db64d0964f66535f20",
                client_secret:"8136718b825475cb108f2c47889a0e85fcbf6866b4206a606fe2f81af21aea90",
                grant_type : 'password',
                username : username,
                password : password},
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},

            // Now we can store the token in a cookie
            success: successCb,
            error:errorCb
        });
    }

}
