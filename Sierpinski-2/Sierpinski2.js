var gl;
var points;
var numTimesToSubDivide = 5;

function triangle(a, b, c)
{
	points.push(a);
	points.push(b);
	points.push(c);
}

function divideTriangle(a, b, c, count)
{
	if(count == 0)
	{	
		triangle(a, b ,c);
	}
	else{
		var ab = mix(a, b, 0.5);
		var ac = mix(a, c, 0.5);
		var bc = mix(b, c, 0.5);
		--count;
		divideTriangle(a, ab, ac, count);
		divideTriangle(c, ac, bc, count);
		divideTriangle(b, bc, ab, count);
	}
}

window.onload = function init() {

	  const canvas = document.querySelector("#glcanvas");
	  // Initialize the GL context
		gl = canvas.getContext("webgl");
	  // Only continue if WebGL is available and working
	  if (!gl) {
		alert("Unable to initialize WebGL. Your browser or machine may not support it.");
		return;
	  }
	  
	var program =initShaders(gl, "vertex-shader", "fragment-shader");
	
	
	gl.useProgram( program );
	
	var vertices = [ vec2(-1.0 , -1.0),
					 vec2(0.0, 1.0),
					 vec2(1.0, -1.0) ];
	
	points = [];
	divideTriangle(vertices[0], vertices[1], vertices[2], numTimesToSubDivide);
	
	
	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	
	  // Set clear color to black, fully opaque
	  gl.clearColor(1.0, 1.0, 1.0, 1.0);	

		render();
};

function render()
{
		
	  // Clear the color buffer with specified clear color
	  gl.clear(gl.COLOR_BUFFER_BIT);
 
	  gl.drawArrays( gl.TRIANGLES, 0, points.length );
	
}