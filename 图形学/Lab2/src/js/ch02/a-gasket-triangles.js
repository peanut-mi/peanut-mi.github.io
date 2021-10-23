"use strict";

const { vec3 } = glMatrix;

var canvas;
var gl;

var points = [];
var colors = [];
var numTimesToSubdivide;

function initTriangles2d(){
	
	numTimesToSubdivide = parseInt(document.getElementById('times').value);

	canvas = document.getElementById( "gl-canvas" );

	gl = WebGLUtils.setupWebGL( canvas );
	if( !gl ){
		alert( "WebGL isn't available" );
	}

	// initialise data for Sierpinski gasket

	// first, initialise the corners of the gasket with three points.
	var vertices = [
		-0.5, -0.5,  0,
		 0,  0.5,  0,
		 0.5, -0.5,  0
	];

	// var u = vec3.create();
	// vec3.set( u, -1, -1, 0 );
	var u = vec3.fromValues( vertices[0], vertices[1], vertices[2] );
	// var v = vec3.create();
	// vec3.set( v, 0, 1, 0 );
	var v = vec3.fromValues( vertices[3], vertices[4], vertices[5] );
	// var w = vec3.create();
	// vec3.set( w, 1, -1, 0 );
	var w = vec3.fromValues( vertices[6], vertices[7], vertices[8] );
	
	var angle = document.getElementById('angle').value;

	var rot = document.getElementsByName('rot');
	if(rot[0].checked){
		console.log(angle);
		u=rorateTriangle(u, angle);
		v=rorateTriangle(v, angle);
		w=rorateTriangle(w, angle);
	}
	else if(rot[1].checked){
		rorate(angle);
	}
	
	divideTriangle( u, v, w, numTimesToSubdivide );
	
	// configure webgl
	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

	// load shaders and initialise attribute buffers
	var program = initShaders( gl, "vertex-shader-2d", "fragment-shader-2d" );
	gl.useProgram( program );

	// load data into gpu
	var vertexBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vertexBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( points ), gl.STATIC_DRAW );

	// associate out shader variables with data buffer
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );

	var temp = document.getElementsByName('jihe');
	for(var i=0; i<temp.length; i++){
		if(temp[i].checked){
			var value = parseInt(temp[i].value);
			if(value == 1){
				renderLine();	
			}
			else if(value == 2){
				renderTriangles();	
			}
			break;
		}
	}
};

// function rorate(angle){
// 	for(var i=0; i<points.length; i+=2){
// 		for(var i=0; i<points.length; i+=2){
// 			var angle2 = getAngle(points[i], points[i+1], angle);
// 			var tmp = rorateTriangle(vec3.fromValues(points[i], points[i+1], 0), angle2);
// 			points[i] = tmp[0];
// 			points[i+1] = tmp[1];
// 		}
// 	}
// }
// function getAngle(a, b, angle){
// 	var length=Math.sqrt(a*a+b*b);
// 	var angle2 = angle*length/1;
// 	return angle2;
// }

function rorateTriangle(dot, angle){
	var theta = angle*Math.PI/180;
	var a=dot[0];
	var b=dot[1];
	var c=a*Math.cos(theta)+b*Math.sin(theta);
	var d=b*Math.cos(theta)-a*Math.sin(theta);
	return vec3.fromValues(c, d, 0);
}

function triangle( a, b, c ){
	//var k;
	points.push( a[0], a[1], a[2] );
	points.push( b[0], b[1], b[2] );
	points.push( c[0], c[1], c[2] );
	// for( k = 0; k < 3; k++ )
	// 	points.push( a[k] );
	// for( k = 0; k < 3; k++ )
	// 	points.push( b[k] );
	// for( k = 0; k < 3; k++ )
	// 	points.push( c[k] );
}

function divideTriangle( a, b, c, count ){
	// check for end of recursion
	if( count == 0 ){
		triangle( a, b, c );
	}else{
		var ab = vec3.create();
		vec3.lerp( ab, a, b, 0.5 );
		var bc = vec3.create();
		vec3.lerp( bc, b, c, 0.5 );
		var ca = vec3.create();
		vec3.lerp( ca, c, a, 0.5 );

		--count;

		// three new triangles
		divideTriangle( a, ab, ca, count );
		divideTriangle( b, bc, ab, count );
		divideTriangle( c, ca, bc, count );
	}
}

function renderTriangles(){
	gl.clear( gl.COLOR_BUFFER_BIT );
	gl.drawArrays( gl.TRIANGLES, 0, points.length/3 );
}

function renderLine(){
	gl.clear(gl.COLOR_BUFFER_BIT);
	for(var i=0;i<points.length;i+=3){
		gl.drawArrays(gl.LINE_LOOP,i,3);
	}
}
