"use strict";

var canvas;
var gl;

var index = 0;


var vertices = [
    0.0, 0.1, 0.0,
    -0.1, -0.1, 0.0,
    0.1, -0.1, 0.0
];
var s = [1.0, 1.0, 1.0];//缩放
var sLoc;

window.onload = function init(){
	canvas = document.getElementById( "gl-canvas" );
	gl = WebGLUtils.setupWebGL( canvas, "experimental-webgl" );
	if( !gl ){
		alert( "WebGL isn't available" );
	}

	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    gl.enable(gl.DEPTH_TEST);

	var program = initShaders( gl, "rtvshader", "rtfshader" );
	gl.useProgram( program );

	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );

	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );

	sLoc = gl.getUniformLocation(program, "s");

	document.getElementById("choice").onchange = function (event) {
        var choice = parseInt(event.target.value);
        var x = document.getElementById("lineNum");
        switch (choice) {
            case 0:
                index = 0;//三角形
                x.style.display = "none";
                break;
            case 1:
                index = 1;//正方形
                x.style.display = "none";
                break;
            case 2:
                index = 2;// 立方体
                x.style.display = "none";
                break;
            case 3:
                index = 3;//圆
                x.style.display = "block";
                break;
            case 4:
                x.style.display = "none";
                break;
        }
    };

	document.getElementById("cl").onchange = function (event) {
        var c = 0;
        var ch = 0;
        var x = document.getElementById("cl").value;
        var Scolor = x.colorRgb();
        for (var i = 0; i < Scolor.length; i++) {
            if (parseInt(Scolor[i]) <= 9 && parseInt(Scolor[i]) >= 0) {
                c = 10 * c + parseInt(Scolor[i]);
            }
            else {
                color[ch++] = c;
                c = 0;
            }
            if (i == Scolor.length - 1) {
                color[ch++] = c;
                c = 0;
            }
        }
        color[3] = 1.0;
        document.getElementById("Demo").innerHTML += "<br>当前R：" + color[0] + ",G：" + color[1] + ",B：" + color[2] + "<br>";
        color[0] /= 255;
        color[1] /= 255;
        color[2] /= 255;
    }
}

function renderTriangle(){
	gl.clear( gl.COLOR_BUFFER_BIT );
	
	// set uniform values
	theta += 0.1*direction;
	if( theta > 2 * Math.PI )
		theta -= (2 * Math.PI);
	
	gl.uniform1f( thetaLoc, theta );

	gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

	// update and render
	//window.requestAnimFrame( renderSquare );

	setTimeout( function (){ requestAnimFrame( renderSquare ); }, delay );
}