"use strict";

var gl;
var canvas;

var points = [];

const {vec3} = glMatrix;

var numTimesToSubdivide = 4;

window.onload = function init(){
	canvas = document.getElementById( "triangle-canvas" );
	gl = WebGLUtils.setupWebGL( canvas );
	if( !gl ){
		alert( "WebGL isn't available" );
	}

	// Three Vertices
	var vertices = [
		-1.0, -1.0, 0, 
		 0.0,  1.0, 0,
		 1.0, -1.0, 0,
	];

    var u = vec3.fromValues( vertices[0], vertices[1], vertices[2] );
    var v = vec3.fromValues( vertices[3], vertices[4], vertices[5] );
    var w = vec3.fromValues( vertices[6], vertices[7], vertices[8] );

    divideTriangle( u, v, w, numTimesToSubdivide);

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

	// Associate external shader variables with data buffer
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );

	render();
}

function triangle(a, b, c){
    points.push( a[0], a[1], a[2]);
    points.push( b[0], b[1], b[2]);
    points.push( c[0], c[1], c[2]);
}

function divideTriangle(a, b, c, count){
    if(count == 0){
        triangle(a, b, c);
    }
    else{
        var ab = vec3.create();
        vec3.lerp(ab, a, b, 0.5);
        //传入两个向量对象，第三个参数为间断值（几分之几，范围是0-1），返回一个计算后得到向量
        var bc = vec3.create();
        vec3.lerp(bc, b, c, 0.5);
        var ca = vec3.create();
        // console.log(ca);
        vec3.lerp(ca, c, a, 0.5);
        // console.log(ca);

        --count;

        divideTriangle( a, ab, ca, count );
        divideTriangle( b, bc, ab, count );
        divideTriangle( c, ca, bc, count );
    }
}

function render(){
	gl.clear( gl.COLOR_BUFFER_BIT );
	//gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
	gl.drawArrays( gl.TRIANGLES, 0, points.length/3 );
	//gl.drawArrays( gl.TRIANGLE_FANS, 3, 6 );
}