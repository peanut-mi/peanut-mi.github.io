"use strict";

var gl;
var points;

var maxNumTriangles = 200;
var maxNumVertices = 3 * maxNumTriangles;
var index = 0;

var colorUniformLocation;



var colors = [
	0.0, 0.0, 0.0, 1.0, // black
	1.0, 0.0, 0.0, 1.0 , // red
	1.0, 1.0, 0.0, 1.0 , // yellow
	0.0, 1.0, 0.0, 1.0 , // green
	0.0, 0.0, 1.0, 1.0 , // blue
	1.0, 0.0, 1.0, 1.0 , // magenta
	0.0, 1.0, 1.0, 1.0  // cyan
];

function init(){
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

		//顶部圈
		-0.05, 0.7,
		-0.1, 0.75,
		-0.1, 0.85,
		-0.05, 0.9,
		0.05, 0.9,
		0.1, 0.85,
		0.1, 0.75,
		0.05, 0.7,

		//里部圈
		//up
		-0.3, 0.33,
		-0.3, 0.43,
		-0.2, 0.43,
		-0.2, 0.33,
		
		0.13, 0.54,
		0.13, 0.62,
		0.05, 0.62,
		0.05, 0.54, 
		//down
		-0.3, -0.23,
		-0.3, -0.43,
		-0.1, -0.43,
		-0.1, -0.23,

		0.13, 0.04,
		0.13, 0.12,
		0.05, 0.12,
		0.05, 0.04, 

		0.33, -0.32,
		0.33, -0.44,
		0.45, -0.44,
		0.45, -0.32, 
	];


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

	gl.clear( gl.COLOR_BUFFER_BIT );
	
	colorUniformLocation = gl.getUniformLocation(program, "u_color");
	
	Tree();

	var decvalue = document.getElementsByName('decoration');
	if(decvalue[0].checked){
		TopDecoration();
	}
	if(decvalue[1].checked){
		InDecoration();
	}
	
	
	// render();
}
function Tree(){
	gl.uniform4f(colorUniformLocation, 0.13 ,0.69 ,0.3, 1.0);
	gl.drawArrays( gl.TRIANGLES, 0, 3 );
	gl.uniform4f(colorUniformLocation, 0.53, 0.0, 0.08, 1.0);
	gl.drawArrays(gl.LINE_LOOP, 0, 3);
	

	gl.uniform4f(colorUniformLocation, 0.13 ,0.69 ,0.30, 1.0);
	gl.drawArrays( gl.TRIANGLES, 3, 3 );

	gl.uniform4f(colorUniformLocation, 0.53, 0.0, 0.08, 1.0);
	gl.drawArrays(gl.LINE_LOOP, 3, 3);
	gl.uniform4f(colorUniformLocation, 0.53, 0.0, 0.08, 1.0);
	gl.drawArrays( gl.TRIANGLE_FAN, 6, 4 );//从6开始画4个点
}

function TopDecoration(){
	gl.uniform4f(colorUniformLocation, 1.0, 0.0, 0.0, 1.0);
	gl.drawArrays( gl.TRIANGLE_FAN, 10, 8 );
	
	gl.uniform4f(colorUniformLocation, 0.53, 0.0, 0.08, 1.0);
	gl.drawArrays(gl.LINE_LOOP, 10, 8);
}

function InDecoration(){
	//up
	//形状
	gl.uniform4f(colorUniformLocation, 1.0, 0.95, 0.0, 1.0);//255,242,0
	gl.drawArrays( gl.TRIANGLE_FAN, 18, 4 );
	//边框
	gl.uniform4f(colorUniformLocation, 0.53, 0.0, 0.08, 1.0);
	gl.drawArrays(gl.LINE_LOOP, 18, 4);

	gl.uniform4f(colorUniformLocation, 0.6, 0.85, 0.91, 1.0);//153,217,234
	gl.drawArrays( gl.TRIANGLE_FAN, 22, 4 );
	
	gl.uniform4f(colorUniformLocation, 0.53, 0.0, 0.08, 1.0);
	gl.drawArrays(gl.LINE_LOOP, 22, 4);
	//down
	gl.uniform4f(colorUniformLocation, 0.6, 0.85, 0.91, 1.0);//153,217,234
	gl.drawArrays( gl.TRIANGLE_FAN, 26, 4 );
	
	gl.uniform4f(colorUniformLocation, 0.53, 0.0, 0.08, 1.0);
	gl.drawArrays(gl.LINE_LOOP, 26, 4);

	gl.uniform4f(colorUniformLocation, 1.0, 0.95, 0.0, 1.0);//153,217,234
	gl.drawArrays( gl.TRIANGLE_FAN, 30, 4 );
	
	gl.uniform4f(colorUniformLocation, 0.53, 0.0, 0.08, 1.0);
	gl.drawArrays(gl.LINE_LOOP, 30, 4);

	gl.uniform4f(colorUniformLocation, 1.0, 0.95, 0.0, 1.0);//153,217,234
	gl.drawArrays( gl.TRIANGLE_FAN, 34, 4 );
	
	gl.uniform4f(colorUniformLocation, 0.53, 0.0, 0.08, 1.0);
	gl.drawArrays(gl.LINE_LOOP, 34, 4);
}



/**未实现 */
function ClickPoints(){
	canvas = document.getElementById( "christmas-tree" );
	gl = WebGLUtils.setupWebGL( canvas );
	if( !gl ){
		alert( "WebGL isn't available" );
	}

	gl.viewport( 0, 0, canvas.width, canvas.height );
	// gl.clearColor( 0.5, 0.5, 0.5, 1.0 );

	canvas.addEventListener( "mousedown", function( event ){
		gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
		var rect = canvas.getBoundingClientRect();
		var cx = event.clientX - rect.left;
		var cy = event.clientY - rect.top; // offset
		var t = glMatrix.vec2.fromValues( 2 * cx / canvas.width - 1, 2 * ( canvas.height - cy ) / canvas.height - 1 );
		gl.bufferSubData( gl.ARRAY_BUFFER, 8 * index, new Float32Array( t ) );

		gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
		var c = glMatrix.vec4.fromValues( colors[index%7*4], colors[index%7*4+1], colors[index%7*4+2], colors[index%7*4+3]);
		gl.bufferSubData( gl.ARRAY_BUFFER, 16 * index, new Float32Array( c ) );
		index++;
	} );

	var program = initShaders( gl, "vertex-shader-p", "fragment-shader-p" );
	gl.useProgram( program );

	var vBuffer = gl.createBuffer(); //position
	gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, 8 * maxNumVertices, gl.STATIC_DRAW );

	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );

	var cBuffer = gl.createBuffer(); // color
	gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, 16 * maxNumVertices, gl.STATIC_DRAW );

	var vColor = gl.getAttribLocation( program, "vColor" );
	gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vColor );

	renderSquare();

}

function renderSquare(){
	// gl.clear( gl.COLOR_BUFFER_BIT );
	gl.drawArrays( gl.POINTS, 0, index );

	window.requestAnimFrame( renderSquare );
}

// function render(){
// 	gl.clear( gl.COLOR_BUFFER_BIT );
// 	gl.drawArrays( gl.TRIANGLES, 0, 3 );
// 	gl.drawArrays( gl.TRIANGLES, 3, 6 );
// 	gl.drawArrays( gl.TRIANGLE_FAN, 6, 10 );
// }