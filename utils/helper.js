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