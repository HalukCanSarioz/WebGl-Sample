var gl;
const numPoints = 5000;
var theta;
var thetaLoc;

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
	
	//init square vertex coordinates
	var vertices = [ vec2(-.6 , -.6),
					 vec2(.6 , -.6),
					 vec2(.6 , .6),
					 vec2(-.6 , .6)];
	
	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	
	thetaLoc = gl.getUniformLocation(program, "theta");
	theta=0;
	gl.uniform1f(thetaLoc, theta);

	  // Set clear color to black, fully opaque
	  gl.clearColor(1.0, 1.0, 1.0, 1.0);
	

		setInterval(render, 50);
};

function render()
{
		
	  // Clear the color buffer with specified clear color
		gl.clear(gl.COLOR_BUFFER_BIT);
		theta += 0.1;
		gl.uniform1f(thetaLoc, theta);
		gl.drawArrays(gl.LINE_LOOP, 0, 4);
		 
		
}