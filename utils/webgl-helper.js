function $$(id) {
    if (!id) return null;
    return document.getElementById(id);
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
	let sourceScript = $$(scriptId);
	if(!sourceScript){
		return null;
	}
	return createShader(gl, type, sourceScript.innerHTML);
}
function createProgram(gl, vertexShader, fragmentShader) {
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

