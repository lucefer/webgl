var random = Math.random;
function randomColor() {
  return {
    r: random() * 255,
    g: random() * 255,
    b: random() * 255,
    a: random() * 1
  };
}

function $$(str) {
  if (!str) return null;
  if (str.startsWith('#')) {
    return document.querySelector(str);
  }
  let result = document.querySelectorAll(str);
  if (result.length == 1) {
    return result[0];
  }
  return result;
}

function getCanvas(id) {
  return $$(id);
}

function resizeCanvas(canvas, width, height) {
  if (canvas.width !== width) {
    canvas.width = width ? width : window.innerWidth;
  }
  if (canvas.height !== height) {
    canvas.height = height ? height : window.innerHeight;
  }
}

function getContext(canvas) {
  return canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
}
function getTouchEvent() {
  var supportTouchEvent = 'ontouchstart' in window;
  var dragStartEvent = supportTouchEvent ? 'touchstart' : 'mousedown';
  var dragMoveEvent = supportTouchEvent ? 'touchmove' : 'mousemove';
  var dragEndEvent = supportTouchEvent ? 'touchend' : 'mouseup';
}

function createShader(gl, type, source) {
  let shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  //检测是否编译正常。
  let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }
  console.error(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

function createShaderFromScript(gl, type, scriptId) {
  let sourceScript = $$('#' + scriptId);
  if (!sourceScript) {
    return null;
  }
  return createShader(gl, type, sourceScript.innerHTML);
}
function createProgram(gl, vertexShader, fragmentShader) {
  let program = gl.createProgram();
  vertexShader && gl.attachShader(program, vertexShader);
  fragmentShader && gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  let result = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (result) {
    console.log('着色器程序创建成功');
    let uniformSetters = createUniformSetters(gl, program);
    let attributeSetters = createAttributeSetters(gl, program);
    return {
      program: program,
      uniformSetters: uniformSetters,
      attributeSetters: attributeSetters
    };
    return program;
  }
  let errorLog = gl.getProgramInfoLog(program);
  gl.deleteProgram(program);
  throw errorLog;
}
function createSimpleProgram(gl, vertexShader, fragmentShader) {
  if (!vertexShader || !fragmentShader) {
    console.warn('着色器不能为空');
    return;
  }
  let program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  let success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }
  console.error(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}
function createSimpleProgramFromScript(gl, vertexScriptId, fragmentScriptId) {
  let vertexShader = createShaderFromScript(
    gl,
    gl.VERTEX_SHADER,
    vertexScriptId
  );
  let fragmentShader = createShaderFromScript(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentScriptId
  );
  let program = createSimpleProgram(gl, vertexShader, fragmentShader);
  return program;
}
function createProgramFromScript(gl, vertexScriptId, fragmentScriptId) {
  let vertexShader = createShaderFromScript(
    gl,
    gl.VERTEX_SHADER,
    vertexScriptId
  );
  let fragmentShader = createShaderFromScript(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentScriptId
  );
  let program = createProgram(gl, vertexShader, fragmentShader);
  return program;
}
function createBuffer(gl, attribute, vertexAttribPointer) {
  let {size, type, normalize, stride, offset} = vertexAttribPointer;
  gl.enableVertexAttribArray(attribute);
  let buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.vertexAttribPointer(
    attribute,
    size,
    type || gl.FLOAT,
    normalize || false,
    stride || 0,
    offset || 0
  );
  return buffer;
}

function loadTexture(gl, src, attribute, callback) {
  let img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = function() {
    gl.activeTexture(gl.TEXTURE0);
    let texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.uniform1i(attribute, 0);
    callback && callback();
  };
  img.src = src;
}

function createColorForVertex(vertex, c) {
  let vertexNums = vertex.positions;
  let colors = [];
  let color = c || {
    r: 255,
    g: 0,
    b: 0,
    a: 255
  };

  for (let i = 0; i < vertexNums.length; i++) {
    color = c || randomColor();
    colors.push(color.r, color.g, color.b, 255);
  }

  vertex.colors = new Uint8Array(colors);
  return vertex;
}

function createAttributeSetter(gl, attributeIndex) {
  return function(bufferInfo) {
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferInfo.buffer);
    gl.enableVertexAttribArray(attributeIndex);
    gl.vertexAttribPointer(
      attributeIndex,
      bufferInfo.numsPerElement || bufferInfo.size,
      bufferInfo.type || gl.FLOAT,
      bufferInfo.normalize || false,
      bufferInfo.stride || 0,
      bufferInfo.offset || 0
    );
  };
}

function getVariableCounts(gl, program, type) {
  return gl.getProgramParameter(program, type);
}

function createAttributeSetters(gl, program) {
  let attributesCount = getVariableCounts(gl, program, gl.ACTIVE_ATTRIBUTES);
  let attributeSetter = {};
  for (let i = 0; i < attributesCount; i++) {
    let attributeInfo = gl.getActiveAttrib(program, i);
    let attributeIndex = gl.getAttribLocation(program, attributeInfo.name);
    attributeSetter[attributeInfo.name] = createAttributeSetter(
      gl,
      attributeIndex
    );
  }
  return attributeSetter;
}

function createUniformSetters(gl, program) {
  let uniformSetters = {};
  let uniformsCount = getVariableCounts(gl, program, gl.ACTIVE_UNIFORMS);
  for (let i = 0; i < uniformsCount; i++) {
    let uniformInfo = gl.getActiveUniform(program, i);
    if (!uniformInfo) {
      break;
    }
    let name = uniformInfo.name;
    if (name.substr(-3) === '[0]') {
      name = name.substr(0, name.length - 3);
    }
    let setter = createUniformSetter(gl, program, uniformInfo);
    uniformSetters[name] = setter;
  }
  return uniformSetters;
}

let enums = {
  FLOAT_VEC2: {
    value: 0x8b50,
    setter: function(location, v) {
      gl.uniform2fv(location, v);
    }
  },
  FLOAT_VEC3: {
    value: 0x8b51,
    setter: function(location, v) {
      console.log(v);
      gl.uniform3fv(location, v);
    }
  },
  FLOAT_VEC4: {
    value: 0x8b52,
    setter: function(location, v) {
      gl.uniform3fv(location, v);
    }
  },
  INT_VEC2: {
    value: 0x8b53,
    setter: function(location, v) {
      gl.uniform2iv(location, v);
    }
  },
  INT_VEC3: {
    value: 0x8b54,
    setter: function(location, v) {
      gl.uniform3iv(location, v);
    }
  },
  INT_VEC4: {
    value: 0x8b55,
    setter: function(location, v) {
      gl.uniform4iv(location, v);
    }
  },
  BOOL: {
    value: 0x8b56,
    setter: function(location, v) {
      gl.uniform1iv(location, v);
    }
  },
  BOOL_VEC2: {
    value: 0x8b57,
    setter: function(location, v) {
      gl.uniform2iv(location, v);
    }
  },
  BOOL_VEC3: {
    value: 0x8b58,
    setter: function(location, v) {
      gl.uniform3iv(location, v);
    }
  },
  BOOL_VEC4: {
    value: 0x8b59,
    setter: function(location, v) {
      gl.uniform4iv(location, v);
    }
  },
  FLOAT_MAT2: {
    value: 0x8b5a,
    setter: function(location, v) {
      gl.uniformMatrix2fv(location, false, v);
    }
  },
  FLOAT_MAT3: {
    value: 0x8b5b,
    setter: function(location, v) {
      gl.uniformMatrix3fv(location, false, v);
    }
  },
  FLOAT_MAT4: {
    value: 0x8b5c,
    setter: function(location, v) {
      gl.uniformMatrix4fv(location, false, v);
    }
  },
  SAMPLER_2D: {
    value: 0x8b5e,
    setter: function(location, texture) {
      gl.uniform1i(location, 0);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
    }
  },
  SAMPLER_CUBE: {
    value: 0x8b60,
    setter: function(location, texture) {
      gl.uniform1i(location, 0);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
    }
  },

  INT: {
    value: 0x1404,
    setter: function(location, v) {
      gl.uniform1i(location, v);
    }
  },

  FLOAT: {
    value: 0x1406,
    setter: function(location, v) {
      gl.uniform1f(location, v);
    }
  }
};
function getKeyFromType(type) {
  for (let i in enums) {
    if (enums[i].value == type) {
      return i;
    }
  }
}
function createUniformSetter(gl, program, uniformInfo) {
  let uniformLocation = gl.getUniformLocation(program, uniformInfo.name);
  let type = uniformInfo.type;
  let isArray = uniformInfo.size > 1 && uniformInfo.name.substr(-3) === '[0]';

  if (isArray && type == enums.INT.value) {
    return function(v) {
      gl.uniform1iv(uniformLocation, v);
    };
  }
  if (isArray && type == enums.FLOAT.value) {
    return function(v) {
      gl.uniform1fv(uniformLocation, v);
    };
  }
  return function createSetter(v) {
    return enums[getKeyFromType(type)].setter(uniformLocation, v);
  };
}

function buffer2Attribute(object) {
  let map = {};
  Object.keys(object).forEach(function(name) {
    if (name == 'indices') {
      return;
    }
    map['a_' + name[0].toUpperCase() + name.substr(1, name.length - 2)] = name;
  });
  return map;
}
function getNumsPerElementByName(name) {
  switch (name) {
    case 'colors':
      return 4;
    case 'positions':
      return 3;
    case 'normals':
      return 3;
    case 'texcoords':
      return 2;
    default:
      return 4;
  }
}
function getTypeByName(name) {
  if (name == 'colors') {
    return Uint8Array;
  }
  if (name == 'positions' || name == 'normals' || name == 'texcoords') {
    return Float32Array;
  }
  if (name == 'indices') {
    return Uint16Array;
  }
  return Float32Array;
}
function makeTypedArray(data, name) {
  if (!data.numsPerElement) {
    data.numsPerElement = getNumsPerElementByName(name, data.length);
  }

  let type = getTypeByName(name);
  let typedArray = data;
  if (Array.isArray(data)) {
    typedArray = new type(data);
  }

  typedArray.numsPerElement = data.numsPerElement;
  Object.defineProperty(typedArray, 'elementsCount', {
    get: function() {
      return this.length / this.numsPerElement;
    }
  });
  return typedArray;
}
function createWebGLBuffer(gl, typedArray, bufferType, drawType) {
  let buffer = gl.createBuffer();
  bufferType = bufferType || gl.ARRAY_BUFFER;
  gl.bindBuffer(bufferType, buffer);
  gl.bufferData(bufferType, typedArray, drawType || gl.STATIC_DRAW);
  return buffer;
}
function getWebGLTypeByTypedArrayType(gl, array) {
  switch (array.constructor) {
    case Int8Array:
      return gl.BYTE;
    case Uint8Array:
      return gl.UNSIGNED_BYTE;
    case Int16Array:
      return gl.SHORT;
    case Uint16Array:
      return gl.UNSIGNED_SHORT;
    case Int32Array:
      return gl.INT;
    case Uint32Array:
      return gl.UNSIGNED_INT;
    case Float32Array:
      return gl.FLOAT;
  }
}
function getNormalize(array) {
  if (array instanceof Uint8Array || array instanceof Int8Array) {
    return true;
  }
  return false;
}
function makeAttributesInBufferInfo(gl, object) {
  let mapping = buffer2Attribute(object);
  let attributeObject = {};
  Object.keys(mapping).forEach(function(attributeName) {
    let bufferName = mapping[attributeName];
    let array = makeTypedArray(object[bufferName], bufferName);
    attributeObject[attributeName] = {
      buffer: createWebGLBuffer(gl, array),
      numsPerElement:
        array.numsPerElement || getNumsPerElementByName(bufferName),
      type: getWebGLTypeByTypedArrayType(gl, array),
      normalize: getNormalize(array)
    };
  });
  return attributeObject;
}
function createBufferInfoFromObject(gl, object) {
  let bufferInfo = {};
  bufferInfo.attributes = makeAttributesInBufferInfo(gl, object);
  let indices = object.indices;
  if (indices) {
    indices = makeTypedArray(indices, 'indices');
    bufferInfo.indices = createWebGLBuffer(
      gl,
      indices,
      gl.ELEMENT_ARRAY_BUFFER
    );
    bufferInfo.elementsCount = indices.length;
  } else {
    bufferInfo.elementsCount = setElementsCountPerAttribute(object);
  }

  return bufferInfo;
}

function setElementsCountPerAttribute(object) {
  let key = Object.keys(object)[0];
  let array = object[key];
  if (array && array.buffer instanceof ArrayBuffer) {
    return array.elementsCount;
  } else {
    return array.length / array.numsPerElement;
  }
}
function setBufferInfos(gl, setters, buffers) {
  if (!buffers.attributes) {
    return;
  }
  setAttributes(setters, buffers.attributes);
  if (buffers.indices) {
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
  }
}

function setAttributes(setters, attributes) {
  setters = setters.attributeSetters || setters;
  Object.keys(attributes).forEach(function(name) {
    let setter = setters[name];
    if (setter) {
      setter(attributes[name]);
    }
  });
}

function setUniforms(setters, values) {
  setters = setters.uniformSetters || setters;
  Object.keys(values).forEach(function(name) {
    let setter = setters[name];
    if (setter) {
      setter(values[name]);
    }
  });
}

// 列表类
function List(list) {
  this.list = list || [];
  this.uuid = this.list.length;
}
// 添加对象
List.prototype.add = function(object) {
  object.uuid = this.uuid;
  this.list.push(object);
  this.uuid++;
};
// 删除对象
List.prototype.remove = function(object) {
  this.list.splice(object.uuid, 1);
};
// 删除对象
List.prototype.get = function(index) {
  return this.list[index];
};
// 添加对象
List.prototype.forEach = function(fun) {
  this.list.forEach(fun);
};
