(function (lib3d) {
	/*3维向量构造函数
 *
 * @param {*} x
 * @param {*} y
 * @param {*} z
 */
function Vector3(x, y, z) {
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
}

/**
 *设置第一个分量
 *
 * @param {*} x
 */

Vector3.prototype.setX = function(x) {
  this.x = x || 0;
  return this;
};

/**
 *设置第二个分量
 *
 * @param {*} y
 */
Vector3.prototype.setY = function(y) {
  this.y = y || 0;
  return this;
};

/**
 *设置第三个分量
 *
 * @param {*} z
 */
Vector3.prototype.setZ = function(z) {
  this.z = z || 0;
  return this;
};

/**
 *设置三个分量
 *
 * @param {*} x
 * @param {*} y
 * @param {*} z
 */
Vector3.prototype.set = function(x, y, z) {
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
};

/**
 * 归一化向量
 *
 * @param {*} vec
 */
Vector3.prototype.normalize = function(vec) {
  var length = this.length();

  if (length > 0.00001) {
    this.x /= length;
    this.y /= length;
    this.z /= length;
  } else {
    this.x = 0;
    this.y = 0;
    this.z = 0;
  }
  return this;
};

/**
 *向量加法
 *
 * @param {*} vec1
 * @param {*} vec2
 */
Vector3.prototype.addVector = function(vec1, vec2) {
  this.x = vec1.x + vec2.x;
  this.y = vec1.y + vec2.y;
  this.z = vec1.z + vec2.z;
  return this;
};

/**
 *向量长度
 *
 * @param {*} vec
 */
Vector3.prototype.length = function(vec) {
  if (vec) {
    return vec.length();
  }
  return Math.sqrt(this.lengthSquare());
};

/**
 *向量长度的平方
 *
 * @param {*} vec
 */
Vector3.prototype.lengthSquare = function(vec) {
  if (vec) {
    return vec.lengthSquare();
  }
  return this.x * this.x + this.y * this.y + this.z * this.z;
};

/**
 *向量加法
 *
 * @param {*} vec1
 * @param {*} vec2
 */
Vector3.prototype.add = function(vec1, vec2) {
  if (vec2) {
    return this.addVector(vec1, vec2);
  }
  this.x += vec1.x;
  this.y += vec1.y;
  this.z += vec1.z;
  return this;
};

/**
 *向量减法，实例方法
 *
 * @param {*} vec1
 * @param {*} vec2
 */
Vector3.prototype.sub = function(vec1, vec2) {
  if (vec2) {
    return this.addVector(vec1, -vec2);
  }
  this.x -= vec1.x;
  this.y -= vec1.y;
  this.z -= vec1.z;
  return this;
};

/**
 *向量减法，类方法
 *
 * @param {*} vec1
 * @param {*} vec2
 */
Vector3.subtractVectors = function(vec1, vec2) {
  return new Vector3(vec1.x - vec2.x, vec1.y - vec2.y, vec1.z - vec2.z);
};

/**
 *向量逐分量相乘
 *
 * @param {*} vec1
 * @param {*} vec2
 */
Vector3.prototype.multiplyVectors = function(vec1, vec2) {
  this.x = vec1.x * vec2.x;
  this.y = vec1.y * vec2.y;
  this.z = vec1.z * vec2.z;
  return this;
};

/**
 *向量逐分量相乘
 *
 * @param {*} vec1
 * @param {*} vec2
 */
Vector3.prototype.multiply = function(vec1, vec2) {
  if (vec2) {
    return this.multiplyVectors(vec1, vec2);
  }
  this.x *= vec1.x;
  this.y *= vec1.y;
  this.z *= vec1.z;
  return this;
};

/**
 *向量点积
 *
 * @param {*} vec1
 * @param {*} vec2
 */
Vector3.dot = function(vec1, vec2) {
  return vec1.x * vec2.x + vec1.y * vec2.y + vec1.z * vec2.z;
};

/**
 *向量差积
 *
 * @param {*} vec1
 * @param {*} vec2
 */
Vector3.cross = function(vec1, vec2) {
  var x = vec1.y * vec2.z - vec2.y * vec1.z;
  var y = vec2.x * vec1.z - vec1.x * vec2.z;
  var z = vec1.x * vec2.y - vec1.y * vec2.x;
  return new Vector3(x, y, z);
};

/**
 * 归一化向量
 *
 * @param {*} vec
 */
Vector3.normalize = function(vec) {
  var length = vec.length();
  if (length > 0.00001) {
    return new Vector3(vec.x / length, vec.y / length, vec.z / length);
  }
  return new Vector3();
};

  
  window.lib3d.Vector3 = Vector3;
})(window.lib3d || (window.lib3d = {}))

