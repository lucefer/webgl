/*
      5 ---------- 6
     /|          / |
    / |         /  | 
  3 --|-------- 2  |
  |   4 --------|- 7
  |  /          |  /
  | /           | / 
  |/            |/ 
  0 ----------- 1
*/

//定义立方体的六个面
var CUBE_FACE_INDICES = [
  [0, 1, 2, 3], //前面
  [4, 5, 6, 7], //后面
  [0, 3, 5, 5], //左面
  [1, 7, 6, 2], //右面
  [3, 2, 6, 5], //上面
  [0, 4, 7, 1] //下面
];

// 根据属性名字推测每个属性所占元素个数。
function getElementsCountPerVertex(attribute) {
  var result = 3;
  switch (attribute) {
    case 'colors':
      result = 4;
      break;
    case 'indices':
      result = 1;
      break;
    case 'texcoords':
      result = 2;
      break;
  }
  return result;
}

// 根据属性名称推测类型化数组
function getArrayTypeByAttribName(attribute) {
  var type = Float32Array;
  switch (attribute) {
    case 'colors':
      type = Uint8Array;
      break;
    case 'indices':
      type = Uint16Array;
      break;
  }
  return type;
}

// 将有索引顶点数据转化成无索引顶点数据
function transformIndicesToUnIndices(vertex) {
  var indices = vertex.indices;
  var vertexsCount = indices.length;
  var destVertex = {};

  Object.keys(vertex).forEach(function(attribute) {
    if (attribute == 'indices') {
      return;
    }
    var src = vertex[attribute];
    var elementsPerVertex = getElementsCountPerVertex(attribute);
    var dest = [];
    var index = 0;
    for (var i = 0; i < indices.length; i++) {
      for (var j = 0; j < elementsPerVertex; j++) {
        dest[index] = src[indices[i] * elementsPerVertex + j];
        index++;
      }
    }
    var type = getArrayTypeByAttribName(attribute);
    destVertex[attribute] = new type(dest);
  });
  return destVertex;
}

// 创建立方体顶点数据
function createCube(width, height, depth){
  var zeroX = width / 2;
  var zeroY = height / 2;
  var zeroZ = depth / 2;
  
  var cornerPositions = [
    [-zeroX, -zeroY, zeroZ],
    [zeroX, -zeroY, zeroZ],
    [zeroX, zeroY, zeroZ],
    [-zeroX, zeroY, zeroZ],
    [-zeroX, -zeroY, -zeroZ],
    [-zeroX, zeroY, -zeroZ],
    [zeroX, zeroY, -zeroZ],
    [zeroX, -zeroY, -zeroZ]
  ];
  var colorDefault = [
    [255, 0, 0, 255],
    [0, 255, 0, 255],
    [0, 0, 255, 255],
    [255, 255, 0, 255],
    [0, 255, 255, 255],
    [255, 0, 255, 255]
  ];
  var normalDefault = [
    0, 0, 1,
    0, 0, -1,
    -1, 0, 0,
    1, 0, 0,
    0, 1, 0, 
    0, -1, 0
  ];
  var texcoordsDefault = [
    [0, 0],
    [0, 1],
    [1, 1],
    [1, 0]
  ];
  
  var colors = [];
  var positions = [];
  var indices = [];
  var normals = [];
  var texcoords = [];
  for(var f = 0; f < 6; f++){
    var faceIndices = CUBE_FACE_INDICES[f];
    var color = colorDefault[f];
    var normal = normalDefault[f];
    for(var v = 0; v < 4; v++){
      var position = cornerPositions[faceIndices[v]];
      positions = positions.concat(position);
      colors = colors.concat(color);
      normals = normals.concat(normal);
      texcoords = texcoords.concat(texcoordsDefault[v]);
    }
    var offset = 4 * f;
    indices.push(offset + 0, offset + 1, offset + 2);
    indices.push(offset + 0, offset + 2, offset + 3);
  }
  indices = new Uint16Array(indices);
  positions = new Float32Array(positions);
  colors = new Uint8Array(colors);
  normals = new Float32Array(normals);
  texcoords = new Float32Array(texcoords);
  
  return {
    positions: positions,
    colors: colors,
    normals: normals,
    texcoords: texcoords,
    indices: indices
  }
}

// 创建球体顶点数据
function createSphere(radius, divideByYAxis, divideByCircle){
  var yUnitAngle = Math.PI / divideByYaxis;
  var circleUnitAngle = Math.PI * 2 / divideByCircle;
  var positions = [];
  var normals = [];
  for(var i = 0; i <= divideByYaxis; i++){
    var unitY = Math.cos(yUnitAngle * i);
    var yValue = radius * unitY;
    for(var j = 0; j <= divideByCircle; j++){
      var unitX = Math.sin(yUnitAngle * i) * Math.cos(circleUnitAngle * j);
      var unitZ = Math.sin(yUnitAngle * i) * Math.sin(circleUnitAngle * j);
      var xValue = radius * unitX;
      var zValue = radius * unitZ;
      
      positions.push(xValue, yValue, zValue);
      normals.push(unitX, unitY, unitZ);
    }
  }
  var indices = [];
  var circleCount = divideByCircle + 1;
  for(var j = 0; j < divideByCircle; j++){
    for(var i = 0; i < divideByYaxis; i++){
      indices.push(i * circleCount + j);
      indices.push(i * circleCount + j + 1);
      indices.push((i + 1) * circleCount + j);
      
      indices.push((i + 1) * circleCount + j);
      indices.push(i * circleCount + j + 1);
      indices.push((i + 1) * circleCount + j + 1);
    }
  }
  return {
    positions: positions,
    normals: normals,
    indices: indices
  }
}
// 创建椎体顶点数据
function createCone(topRadius, bottomRadius, height, bottomDivide, verticalDivide, topColor, bottomColor, verticalColor){
  var positions= [];
  var indices = [];
  var colors = [];
  var normals = [];
  
  var atanθ = Math.atan2(bottomRadius - topRadius, height);
  var cosAtanθ = Math.cos(atanθ);
  var sinAtanθ = Math.sin(atanθ);
  var color = bottomColor || {r: 200, g: 200, b: 200, a: 255};
  
  for(var i = -1; i <= verticalDivide + 1; i++){
    var currentRadius = 0;
    if(i > verticalDivide){
      currentRadius = topRadius;
    } else if(i < 0){
      currentRadius = bottomRadius;
    } else {
      currentRadius = bottomRadius + (topRadius - bottomRadius) * (i / verticalDivide);
    }
    let yValue = (height * i) / verticalDivide - height / 2;
    if (i == -1 || i == verticalDivide + 1) {
      color = bottomColor || {r: 100, g: 100, b: 100, a: 255};
      currentRadius = 0;
      if (i == -1) {
        yValue = -height / 2;
      } else {
        yValue = height / 2;
      }
    } else {
      color = {r: 100, g: 100, b: 100, a: 255};
    }
    for (let j = 0; j <= bottomDivide; j++) {
      let xUnit = Math.sin((j * Math.PI * 2) / bottomDivide);
      let zUnit = Math.cos((j * Math.PI * 2) / bottomDivide);
      let xValue = currentRadius * xUnit;
      var zValue = currentRadius * zUnit;
      positions.push(xValue, yValue, zValue);
      normals.push(
        i < 0 || i > verticalDivide ? 0 : xUnit * cosAtanθ,
        i < 0 ? -1 : i > verticalDivide ? 1 : sinAtanθ,
        i < 0 || i > verticalDivide ? 0 : zUnit * cosAtanθ
      );
      colors.push(color.r, color.g, color.b, color.a);
    }
  }

  // indices
  let vertexCountPerRadius = bottomDivide + 1;
  for (let i = 0; i < verticalDivide + 2; i++) {
    for (let j = 0; j < bottomDivide; j++) {
      indices.push(i * vertexCountPerRadius + j);
      indices.push(i * vertexCountPerRadius + j + 1);
      indices.push((i + 1) * vertexCountPerRadius + j + 1);

      indices.push(
        vertexCountPerRadius * (i + 0) + j,
        vertexCountPerRadius * (i + 1) + j + 1,
        vertexCountPerRadius * (i + 1) + j
      );
    }
  }

  positions = new Float32Array(positions);
  indices = new Uint16Array(indices);
  normals = new Float32Array(normals);
  colors = new Uint8Array(colors);
  return {
    positions: positions,
    colors: colors.
    indices: indices,
    normals: normals
  };
}

