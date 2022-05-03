var gl;

window.onload = function init(){
	  const canvas = document.querySelector("#glcanvas");
	  // Initialize the GL context
		gl=WebGLUtils.setupWebGL(canvas);
	  // Only continue if WebGL is available and working
	  if (!gl) {
		alert("Unable to initialize WebGL. Your browser or machine may not support it.");
		return;
	  }
	  
	var program =initShaders(gl, "vertex-shader", "fragment-shader");	
	gl.useProgram( program );
	
	//vertex coordinates for the cube
	var vertices = [
					 vec3(-0.5, -0.5, 0.5),
					 vec3(-0.5, 0.5, 0.5),
				   	 vec3(0.5, 0.5, 0.5),
					 vec3(0.5, -0.5, 0.5),
					 vec3(-0.5, -0.5, -0.5),
					 vec3(-0.5, 0.5, -0.5),
					 vec3(0.5, 0.5, -0.5),
					 vec3(0.5, -0.5, -0.5)
					 ];

	var vertexColors = [
				[0.0, 0.0, 0.0, 1.0],  //black
				[1.0, 0.0, 0.0, 1.0],  //red
				[1.0, 1.0, 0.0, 1.0],  //yellow
				[0.0, 1.0, 0.0, 1.0],  //green
				[0.0, 0.0, 1.0, 1.0],  //blue
				[1.0, 0.0, 1.0, 1.0],  //magenta
				[1.0, 1.0, 1.0, 1.0],  //white	
				[0.0, 1.0, 1.0, 1.0]   //cyan
				];

	var indices = [ 1, 0, 3,     3, 2, 1,
					2, 3, 7,     7, 6, 2,
					3, 0, 4,     4, 7, 3,
					6, 5, 1,     1, 2, 6,
					4, 5, 6,     6, 7, 4,
					5, 4, 0,     0, 1, 5];


	
	var vBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer);
	gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	
	var cBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(vertexColors), gl.STATIC_DRAW );

	var cPosition = gl.getAttribLocation( program, "vColor" );
	gl.vertexAttribPointer( cPosition, 4, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( cPosition );
	
	var iBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, iBuffer );
	gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), gl.STATIC_DRAW );

	var modelViewMatrix = lookAt( vec3(1.5, 1.0, 3.0),   //eye
	                              vec3(0.0, 0.0, 0.0),   //at
								  vec3(0.0, 1.0, 0.0)    //up
									);
									
	var projectionMatrix =perspective(60, 1.0, 1.0, 20.0); //ortho(-1.0, 1.0, -1.0, 1.0, 0.0, 20.0);
	//var projectionMatrix = ortho(-1.0, 1.0, -1.0, 1.0, 0.0, 20.0);

	var mVMatLoc = gl.getUniformLocation( program, "modelViewMatrix");
	gl.uniformMatrix4fv(mVMatLoc, false, flatten(modelViewMatrix));
	
   	var pMatLoc = gl.getUniformLocation( program, "projectionMatrix");
	gl.uniformMatrix4fv(pMatLoc, false, flatten(projectionMatrix));

	gl.enable(gl.CULL_FACE);
	//gl.enable(gl.DEPT_TEST);
    //gl.cullFace(gl.FRONT);
	

	  // Set clear color to light gray
	  gl.clearColor(.8, .8, 0.8, 1.0);

	  render();
};

function render()
{
	  // Clear the color buffer with specified clear color
	  gl.clear(gl.COLOR_BUFFER_BIT ); //| gl.DEPT_BUFFER_BIT);
 
	  gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_BYTE, 0);
	
}