var gl;
const numPoints = 5000;

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

	var u = scale(0.5, add(vertices[0], vertices[1]));
	var v = scale(0.5, add(vertices[0], vertices[2]));
	var p = scale(0.5, add(u, v));
	points = [ p ];

	for (var i = 1; i < numPoints; ++i) {
	   var j = Math.floor(Math.random() * 3);
	   p = scale(0.5, add(points[i-1], vertices[j]));
	   points.push(p);
	}

	
	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	
	  // Set clear color to black, fully opaque
	  gl.clearColor(.0, 0.0, 0.0, 1.0);
	

		render();
};

function render()
{
		
	  // Clear the color buffer with specified clear color
	  gl.clear(gl.COLOR_BUFFER_BIT);
 
	  gl.drawArrays( gl.POINTS, 0, numPoints );
	
}