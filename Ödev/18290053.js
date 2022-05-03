var gl;
var theta;
var thetaLoc;
var kat=1;
var carpmaislem;
var yeşilton1;
var yeşilton2=0.0;
var kırmızıton1;
var kırmızıton2=0.0;
var maviton1;
var maviton2=0.0;
var yatay;
var yataykor=0;
var düşey;
var düşeykor=0;

window.onload = function init() {

  const canvas = document.querySelector("#glcanvas");
  // Initialize the GL context
  gl = canvas.getContext("webgl");
  // Only continue if WebGL is available and working
  if (!gl) {
    alert("Unable to initialize WebGL. Your browser or machine may not support it.");
    return;
  }
  
  var program = initShaders(gl,"vertex-shader","fragment-shader"); 
  gl.useProgram( program );
  
		document.getElementById("mavi").onchange=function() {maviton2 = this.value;};
		document.getElementById("kirmizi").onchange=function() {kırmızıton2 = this.value;};
		document.getElementById("yesil").onchange=function() {yeşilton2 = this.value;};
		
		maviton1 = gl.getUniformLocation(program, "maviderece");
		kırmızıton1 = gl.getUniformLocation(program, "kirmiziderece");
		yeşilton1 = gl.getUniformLocation(program, "yesilderece");
		
		gl.uniform1f(maviton1,maviton2);
		gl.uniform1f(yeşilton1,yeşilton2);
		gl.uniform1f(kırmızıton1,kırmızıton2);
		
		var kaydırma2 = document.getElementById("Kaydirma");
				kaydırma2.addEventListener("click", function() {
					switch (kaydırma2.selectedIndex) {
						case 0:
							düşeykor = düşeykor+(0.1); 
							break;
						case 1:
							düşeykor = düşeykor-(0.1);
							break;
						case 2:
							yataykor = yataykor+(0.1);
							break;
						case 3:
							yataykor = yataykor-(0.1);
							break;
					}
				});
				
		var çevirme2 = document.getElementById("Çevirme");
			çevirme2.addEventListener("click", function() {
				switch (çevirme2.selectedIndex) {
					case 0:
						theta=theta-0.2;
						break;
					case 1:
						theta=theta+0.2;
						break;
				}
			});				
			
		var boyut2 = document.getElementById("Boyut");
			boyut2.addEventListener("click", function() {
				switch (boyut2.selectedIndex) {
					case 0:
						kat = kat*(0.5);
						break;
					case 1:
						kat = kat*(1.5);
						break;
						
					}
				});
		var vertices = [ vec2(-.9,-.5), 
						vec2(-.7,-.5),
						vec2( -.9,.5), 
						vec2(-.7,-.5),
						vec2(-.9,.5),
						vec2(-.7,.5),
						vec2(-.7,-.1),
						vec2(-.7,.1),
						vec2(-.3,-.1),
						vec2(-.3,-.1),
						vec2(-.7,.1),
						vec2(-.3,.1),
						vec2(-.3,-.5),
						vec2(-.1,-.5),
						vec2(-.3,.5),
						vec2(-.1,-.5),
						vec2(-.3,.5),
						vec2(-.1,.5),
						vec2(.1,.5),
						vec2(.1,.3),
						vec2(.9,.5),
						vec2(.1,.3),
						vec2(.9,.5),
						vec2(.9,.3),
						vec2(.7,.3),
						vec2(.8,.2),
						vec2(.9,.3),
						vec2(.7,.3),
						vec2(.8,.2),
						vec2(.3,-.3),
						vec2(.7,.3),
						vec2(.2,-.2),
						vec2(.3,-.3),
						vec2(.2,-.2),
						vec2(.1,-.3),
						vec2(.3,-.3),
						vec2(.1,-.3),
						vec2(.9,-.3),
						vec2(.9,-.5),
						vec2(.1,-.3),
						vec2(.1,-.5),
						vec2(.9,-.5)];
					 
	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	
	thetaLoc = gl.getUniformLocation(program, "theta");
	theta=0;
	gl.uniform1f(thetaLoc, theta);  
	
	yatay=gl.getUniformLocation(program,"yatayyer");
	düşey=gl.getUniformLocation(program,"sutunyer");
	gl.uniform1f(yatay,yataykor); 
	gl.uniform1f(düşey,düşeykor);
	
	carpmaislem=gl.getUniformLocation(program,"katlama");
	gl.uniform1f(carpmaislem,kat);

  // Set clear color to black, fully opaque
  gl.clearColor(.0,0.0,.0,.0);
  // Clear the color buffer with specified clear color
	requestAnimFrame(render);

};
function render() {
	//gl.clear(gl.COLOR_BUFFER_BIT);
  
	//gl.drawArrays( gl.TRIANGLES, 0, numPoints );
	gl.clear(gl.COLOR_BUFFER_BIT);
		
	gl.uniform1f(maviton1,maviton2);
	gl.uniform1f(kırmızıton1,kırmızıton2); 
	gl.uniform1f(yeşilton1,yeşilton2);
	
	gl.uniform1f(carpmaislem,kat);
	
	gl.uniform1f(thetaLoc, theta);

	gl.uniform1f(düşey,düşeykor);
	gl.uniform1f(yatay,yataykor);
	 
	gl.drawArrays(gl.TRIANGLES, 0, 42);
	
	requestAnimFrame(render);
}