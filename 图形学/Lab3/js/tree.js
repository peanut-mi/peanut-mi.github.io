"use strict";

var gl;
var points;

window.onload = function init(){
	var canvas = document.getElementById( "chirstmas-tree" );
	gl = WebGLUtils.setupWebGL( canvas );
	//var ctx = canvas.getContext('2d');

	if( !gl ){
		alert( "WebGL isn't available" );
	}

	// Three Vertices
	var vertices = [
        //第一个三角形
		-0.5, 0.3,
        0.0, 0.8,
        0.5, 0.3,
        //第二个三角形
        -1.0, -0.5,
        0.0, 0.3,
        1.0, -0.5,
        //四边形
		-0.25, -1.0,
		-0.25, -0.5,
		0.25, -0.5,
		0.25, -1.0,
	];

	// ctx.lineWidth = 1 ;
	// ctx.strokeStyle='#880015';
	
	// ctx.beginPath();
	// ctx.moveTo(vertices[0], vertices[1]);
	// ctx.lineTo(vertices[2], vertices[3]);
	// ctx.lineTo(vertices[4], vertices[5]);
	// ctx.closePath();
	// ctx.stroke();

	// Configure WebGL
	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

	// Load shaders and initialize attribute buffers
	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( program );

	// Load the data into the GPU
	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );
	//gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices2 ), gl.STATIC_DRAW );

	// Associate external shader variables with data buffer
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );

	render();
}
function render(){
	gl.clear( gl.COLOR_BUFFER_BIT );
	gl.drawArrays( gl.TRIANGLES, 0, 3 );
	gl.drawArrays( gl.TRIANGLES, 3, 6 );
	gl.drawArrays( gl.TRIANGLE_FAN, 6, 10 );
}