const random = Math.random;
function randomColor(){
	return  {
		r: random() * 255,
		g: random() * 255,
		b: random() * 255,
		a: random() * 1
	}
}
function $$(str) {
    if (!str) return null;
    if(str.startsWith('#')){
    	return document.querySelector(str);
    }
    return document.querySelectorAll(str);
}

function getCanvas(id) {
    return $$(id);
}

function resizeCanvas(canvas, width, height) {
    if (canvas.width !== width) {
        canvas.width = width ? width : window.innerWidth;
    }
    if (canvas.height !== height) {
        canvas.height = height ? height: window.innerHeight;
    }
}

function getContext(canvas){
	return canvas.getContext('webgl') ||  canvas.getContext('experimental-webgl');
}

function createShader(gl, type, source) {
    let shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    //检测是否编译正常。
    let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if(success){
    	return shader;
    }
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

function createShaderFromScript(gl, type, scriptId){
	let sourceScript = $$('#' + scriptId);
	if(!sourceScript){
		return null;
	}
	return createShader(gl, type, sourceScript.innerHTML);
}

function createSimpleProgram(gl, vertexShader, fragmentShader) {
    if(!vertexShader || !fragmentShader){
    	console.warn('着色器不能为空')
    	return;
    }
    let program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    let success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if(success){
    	return program;
    }
    console.error(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}
function createSimpleProgramFromScript(gl, vertexScriptId, fragmentScriptId){
	let vertexShader = createShaderFromScript(gl, gl.VERTEX_SHADER, vertexScriptId);
	let fragmentShader = createShaderFromScript(gl, gl.FRAGMENT_SHADER, fragmentScriptId)
	let program = createSimpleProgram(gl, vertexShader, fragmentShader);
	return program;
}

function createBuffer(gl, attribute, vertexAttribPointer){
	let {size, type, normalize, stride, offset}  = vertexAttribPointer
	gl.enableVertexAttribArray(attribute);
	let buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.vertexAttribPointer(attribute, size, type || gl.FLOAT, normalize || false, stride || 0, offset || 0);
	return buffer;
}

function createProgramFromScript(gl, vertexScriptId, fragmentScriptId){
	let vertexShader = createShaderFromScript(gl, gl.VERTEX_SHADER, vertexScriptId);
	let fragmentShader = createShaderFromScript(gl, gl.FRAGMENT_SHADER, fragmentScriptId)
	let program = createSimpleProgram(gl, vertexShader, fragmentShader);
	return program;
}

function loadTexture(gl, src, attr, callback){
	var img = new Image();
	img.crossOrigin = 'anonymous';
	img.onload = function(){
		gl.activeTexture(gl.TEXTURE0);
		var texture= gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, texture);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
		gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameterf(gl.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.LINEAR);
		gl.uniform1i(attr, 0);
		callback && callback();
	};
	img.src= src;
}


