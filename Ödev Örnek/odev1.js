var gl;
var MVmatrix, MVmatrixLoc;
var color, colorLoc;

function keyFunc(event) {
	switch (event.keyCode) {
		case 37: // left arrow 
			MVmatrix = mult(translate(-.01,0.0,0.0), MVmatrix);
			render();
			break;
        case 38: // up arrow
			MVmatrix = mult(translate(0.0,.01,0.0), MVmatrix);
			render();
            break;
        case 39: // right arrow
			MVmatrix = mult(translate(.01,0.0,0.0), MVmatrix);
			render();
            break;
        case 40: // down arrow
			MVmatrix = mult(translate(0.0,-.01,0.0), MVmatrix);
			render();
            break;
    }
}

window.onload = function init() {
	const canvas = document.querySelector("#glcanvas");
	// Initialize the GL context
	gl = WebGLUtils.setupWebGL(canvas);
	// Only continue if WebGL is available and working
	if (!gl) {
		alert("Unable to initialize WebGL. Your browser or machine may not support it.");
		return;
	}
	  
	var program = initShaders(gl, "vertex-shader", "fragment-shader");
	gl.useProgram( program );

	// accessing the sliders and defining callbacks
	document.getElementById("redSlider").onchange = 
			function() {
				color[0] = this.value;
				render();
			};
	document.getElementById("greenSlider").onchange = 
			function() {
				color[1] = this.value;
				render();
			};
	document.getElementById("blueSlider").onchange = 
			function() {
				color[2] = this.value;
				render();
			};
	window.addEventListener("keydown", keyFunc);

	var m = document.getElementById("mymenu");
	m.addEventListener("click", function() {
		switch (m.selectedIndex) {
			case 0:
				MVmatrix = mult(scalem(1.1,1.1,1.1), MVmatrix);
				render();
				break;
			case 1:
				MVmatrix = mult(scalem(.9,.9,.9), MVmatrix);
				render();
				break;
			case 2:
				MVmatrix = mult(rotateZ(5), MVmatrix);
				render();
				break;
			case 3:
				MVmatrix = mult(rotateZ(-5), MVmatrix);
				render();
				break;
		}
	});
	
	// The color we draw with. Default color is blue. It will change with sliders
	color = vec4(0.0, 0.0, 1.0, 1.0);
	
	// initial square vertex coordinates
	var vertices = [ // first letter K
					 vec2(-.9, -.8), // first 4 vertices
					 vec2(-.7, -.8), // will be drawn as 
					 vec2(-.7,  .8), // a triangle fan for 
					 vec2(-.9,  .8), // the vertical side of K
					 
					 vec2(-.6, 0.0), // next 7 vertices 
					 vec2(-.1, -.8), // will be drawn as
					 vec2(-.3, -.8), // a triangle fan 
					 vec2(-.7, -.2), // for the rest of K
					 vec2(-.7,  .2),
					 vec2(-.3,  .8), 
					 vec2(-.1,  .8),
					 
					 // second letter U 
					 vec2(.1,  .8), // next 8 vertices 
					 vec2(.3,  .8), // will be drawn as  
					 vec2(.1, -.8), // a triangle strip 
					 vec2(.3, -.6), // for U
					 vec2(.9, -.8),
					 vec2(.7, -.6),
					 vec2(.9,  .8),
					 vec2(.7,  .8), 
					 
					 // dots above U
					 vec2(.3,   .85), // next 4 will be 
					 vec2(.45,  .85), // drawn as a triangle 
					 vec2(.45, 1.0), // fan
					 vec2(.3,  1.0), 
					 
					 vec2(.55,  .85), // next 4 will be 
					 vec2(.7,   .85), // drawn as a triangle 
					 vec2(.7,  1.0), // fan
					 vec2(.55, 1.0)
					]; 
					
	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

	// Associate out shader variables with our data buffer
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	
	// make the default transformation matrix identity matrix
	MVmatrix = mat4();
	
	// Get access to the uniform matrix in the shader and send the default matrix first
	MVmatrixLoc = gl.getUniformLocation(program, "vMVmatrix");
	gl.uniformMatrix4fv(MVmatrixLoc, false, flatten(MVmatrix));

	colorLoc = gl.getUniformLocation(program, "fColor");
	gl.uniform4fv(colorLoc, color);
	
	// Set clear color to light gray
	gl.clearColor(.8, .8, .8, 1.0);
	
	render();

};

function render() {
	// Clear the color buffer with specified clear color
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.uniform4fv(colorLoc, color);
	gl.uniformMatrix4fv(MVmatrixLoc, false, flatten(MVmatrix));
	  
	gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
	gl.drawArrays(gl.TRIANGLE_FAN, 4, 7);
	gl.drawArrays(gl.TRIANGLE_STRIP, 11, 8);
	gl.drawArrays(gl.TRIANGLE_FAN, 19, 4);
	gl.drawArrays(gl.TRIANGLE_FAN, 23, 4);
}