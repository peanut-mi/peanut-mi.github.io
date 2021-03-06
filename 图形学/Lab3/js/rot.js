"use strict";

var canvas;
var gl;

var theta = 0.0;
var direction = 1;
var delay = 200;
var thetaLoc;


function initRotSquare(){
	canvas = document.getElementById( "rot-canvas" );
	gl = WebGLUtils.setupWebGL( canvas, "experimental-webgl" );
	if( !gl ){
		alert( "WebGL isn't available" );
	}

	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

	var program = initShaders( gl, "rot-v-shader", "rot-f-shader" );
	gl.useProgram( program );

	var vertices = [
		 0,  1,  0,
		-1,  0,  0,
		 1,  0,  0,
		 0, -1,  0
	];

	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );

	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );

	thetaLoc = gl.getUniformLocation( program, "theta" );

	renderSquare();
}

function changeSpeed(){
	var temp = document.getElementsByName('change');
	for(var i=0; i<temp.length; i++){
		if(temp[i].checked){
			var value = parseInt(temp[i].value);
			console.log(value);
			if(value == 1) delay /= 2;
			else if(value == -1) delay *= 2;
			break;
		}
	}
}

function convert(){
	direction *= -1;
}

function renderSquare(){
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