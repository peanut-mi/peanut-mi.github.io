function draw() {
	var canvas = document.getElementById('gl-canvas');

	var ctx = canvas.getContext('2d');

	ctx.strokeStyle = "red";
	ctx.lineWidth = 1 ;
	
	var depth = parseInt(document.getElementById("times").value);
	var theta = parseInt(document.getElementById('theta').value);
	console.log(theta);
	theta = theta/180*Math.PI;
	//console.log(Math.cos(theta));

	
	function sierpinski(x1,y1,x2,y2,x3,y3,n){
		if (n<0)  return;

		ctx.beginPath();
		ctx.moveTo(x1,y1);
		ctx.lineTo(x2,y2);
		ctx.lineTo(x3,y3);
		ctx.lineTo(x1,y1);
		ctx.closePath();
		ctx.stroke();

		var x4 = (x1 + x2) / 2;
		var y4 = (y1 + y2) / 2;
		var x5 = (x2 + x3) / 2;
		var y5 = (y2 + y3) / 2;
		var x6 = (x1 + x3) / 2;
		var y6 = (y1 + y3) / 2;
		sierpinski(x1,y1,x4,y4,x6,y6,n-1);
		sierpinski(x6,y6,x5,y5,x3,y3,n-1);
		sierpinski(x4,y4,x2,y2,x5,y5,n-1);
		sierpinski(x4,y4,x5,y5,x6,y6,n-1);
	}

	var a1=300, b1=500-500*Math.sqrt(3)/2;
	//console.log(b1);
	var a2=50, b2=500;
	var a3=550, b3=500;
	function overturn(x1,y1,x2,y2,x3,y3){
		var a1 = x1, b1 = y1;
		var a2 = x2, b2 = y2;
		var a3 = x3, b3 = y3;

		var width=canvas.width, height=canvas.height;
		var rw = width*Math.cos(theta)-height*Math.sin(theta);
		var rh = height*Math.cos(theta)+width*Math.sin(theta);
		var woffset, hoffset;
		woffset = Math.abs(rw>width?(rw-width)/2:(width-rw)/2);
		hoffset = Math.abs(rh>height?(rh-height)/2:(height-rh)/2);
		console.log(woffset+','+hoffset);

		x1 = a1*Math.cos(theta)-b1*Math.sin(theta);
		y1 = b1*Math.cos(theta)+a1*Math.sin(theta);
		x2 = a2*Math.cos(theta)-b2*Math.sin(theta);
		y2 = b2*Math.cos(theta)+a2*Math.sin(theta);
		x3 = a3*Math.cos(theta)-b3*Math.sin(theta);
		y3 = b3*Math.cos(theta)+a3*Math.sin(theta);

		while(x1<0||x2<0||x3<0){
			console.log(x1+',,,'+x2+',,,'+x3);
			x1+=woffset;
			x2+=woffset;
			x3+=woffset;
		}
		
		while(x1>width||x2>width||x3>width){
			x1-=woffset;
			x2-=woffset;
			x3-=woffset;
		}
		while(y1<0||y2<0||y3<0){
			y1+=hoffset;
			y2+=hoffset;
			y3+=hoffset;
		}
		while(y1>height||y2>height||y3>height){
			y1-=hoffset;
			y2-=hoffset;
			y3-=hoffset;
		}
		
		console.log('x1:'+x1+',y1:'+y1);
		console.log('x2:'+x2+',y2:'+y2);
		console.log('x3:'+x3+',y3:'+y3);

		ctx.clearRect(0,0,800,600);
		sierpinski(x1, y1, x2, y2, x3, y3,depth);
		
	}
	
	overturn(a1, b1, a2, b2, a3, b3);
	//sierpinski(300, 500-500*Math.sqrt(3)/2, 50, 500, 550, 500,depth);
}