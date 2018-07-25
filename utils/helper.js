function createShader(gl,type,source){
	var shader = gl.createShader(type);
	gl.shaderSource(shader,source);
	gl.compileShader(shader);
	//检测是否编译正常。
	return shader;
}
function createProgram(gl,vertexShader,fragmentShader){
	var program = gl.createProgram();
	gl.attachShader(program,vertexShader);
	gl.attachShader(program,fragmentShader);
	gl.linkProgram(program);
	gl.useProgram(program);
	return program;
}
function getModel(){
	if(window.glModel){
		return window.glModel
	}else {
		window.glModel = {};
		return window.glModel
	}
}
function getUniforms(gl,index){
	let cache = getModel()[index];
	if(!cache){
		var uniform =  gl.getUniformLocation(gl.program, "u_FragColor");
		getModel()[index] = uniform;
		cache = uniform;
	}
	return cache;
}