/**
 *四元数构造函数
 *
 * @param {*} x
 * @param {*} y
 * @param {*} z
 */
function Quaternion(x, y, z, w) {
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
  this.w = w !== undefined ? w : 1;
}
/**
 *设置 x 分量。
 *
 * @param {*} x
 */
Quaternion.prototype.setX = function(x) {
  this.x = x || 0;
};
/**
 *设置 y 分量。
 *
 * @param {*} y
 */
Quaternion.prototype.setY = function(y) {
  this.y = y || 0;
};
/**
 *设置 z 分量。
 *
 * @param {*} z
 */
Quaternion.prototype.setZ = function(z) {
  this.z = z || 0;
};

/**
 *设置 w 分量。
 *
 * @param {*} w
 */
Quaternion.prototype.setW = function(w) {
  this.w = w;
};

/**
 *欧拉角转四元数
 *
 * euler，欧拉角
 */
Quaternion.prototype.setFromEuler = function(euler) {
  var x = euler.x,
    y = euler.y,
    z = euler.z,
    order = euler.order;

  var cosx = Math.cos(x / 2);
  var cosy = Math.cos(y / 2);
  var cosz = Math.cos(z / 2);

  var sinx = Math.sin(x / 2);
  var siny = Math.sin(y / 2);
  var sinz = Math.sin(z / 2);

  if (order === 'XYZ') {
    this.x = sinx * cosy * cosz + cosx * siny * sinz;
    this.y = cosx * siny * cosz - sinx * cosy * sinz;
    this.z = cosx * cosy * sinz + sinx * siny * cosz;
    this.w = cosx * cosy * cosz - sinx * siny * sinz;
  } else if (order === 'YXZ') {
    this.x = sinx * cosy * cosz + cosx * siny * sinz;
    this.y = cosx * siny * cosz - sinx * cosy * sinz;
    this.z = cosx * cosy * sinz - sinx * siny * cosz;
    this.w = cosx * cosy * cosz + sinx * siny * sinz;
  } else if (order === 'ZXY') {
    this.x = sinx * cosy * cosz - cosx * siny * sinz;
    this.y = cosx * siny * cosz + sinx * cosy * sinz;
    this.z = cosx * cosy * sinz + sinx * siny * cosz;
    this.w = cosx * cosy * cosz - sinx * siny * sinz;
  } else if (order === 'ZYX') {
    this.x = sinx * cosy * cosz - cosx * siny * sinz;
    this.y = cosx * siny * cosz + sinx * cosy * sinz;
    this.z = cosx * cosy * sinz - sinx * siny * cosz;
    this.w = cosx * cosy * cosz + sinx * siny * sinz;
  } else if (order === 'YZX') {
    this.x = sinx * cosy * cosz + cosx * siny * sinz;
    this.y = cosx * siny * cosz + sinx * cosy * sinz;
    this.z = cosx * cosy * sinz - sinx * siny * cosz;
    this.w = cosx * cosy * cosz - sinx * siny * sinz;
  } else if (order === 'XZY') {
    this.x = sinx * cosy * cosz - cosx * siny * sinz;
    this.y = cosx * siny * cosz - sinx * cosy * sinz;
    this.z = cosx * cosy * sinz + sinx * siny * cosz;
    this.w = cosx * cosy * cosz + sinx * siny * sinz;
  }

  return this;
};

/**
 *饶轴向量的旋转一定角度所对应的四元数
 *
 * axis，轴向量。
 * angle，旋转角度。
 */
Quaternion.prototype.setFromAxisAngle = function(axis, angle) {
  // axis 轴向量必须是归一化后的单位向量。
  //根据公式 q = {w: cos(θ/2), x: sin(θ/2)*axis.x, y: sin(θ/2) * axis.y, z: sin(θ/2) * axis.z}
  var halfAngle = angle / 2,
    s = Math.sin(halfAngle);

  this.x = axis.x * s;
  this.y = axis.y * s;
  this.z = axis.z * s;
  this.w = Math.cos(halfAngle);

  return this;
};

/**
 *求出当前四元数旋转到目标四元数所经过的角度。
 *
 * q，目标四元数。
 */
Quaternion.prototype.angleTo = function(q) {
  // dot(this, q) 求出当前四元数与目标四元数的夹角的余弦值。
  return 2 * Math.acos(Math.abs(window.lib3d.math.clamp(this.dot(q), -1, 1)));
};

/**
 *求四元数的逆
 *
 */
Quaternion.prototype.inverse = function() {
  // 根据公式 q-1 =q*/|q| * |q|，因为单位四元数 |q| = 1，所以，q-1 = q*。
  // 求单位四元数的逆，等同于求该四元数的共轭四元数。
  return this.conjugate();
};

/**
 *求四元数的共轭
 *
 */
Quaternion.prototype.conjugate = function() {
  this.x *= -1;
  this.y *= -1;
  this.z *= -1;

  return this;
};
/**
 *求四元数的点积
 *
 * q，待乘四元数
 */
Quaternion.prototype.dot = function(q) {
  return this.x * q.x + this.y * q.y + this.z * q.z + this.w * q.w;
};
Quaternion.prototype.setFromRotationMatrix = function(m) {
  var m11 = m[0],
    m12 = m[4],
    m13 = m[8],
    m21 = m[1],
    m22 = m[5],
    m23 = m[9],
    m31 = m[2],
    m32 = m[6],
    m33 = m[10];

  var t = m11 + m22 + m33,
    s;

  if (t > 0) {
    s = 0.5 / Math.sqrt(t + 1.0);

    this.w = 0.25 / s;
    this.x = (m32 - m23) * s;
    this.y = (m13 - m31) * s;
    this.z = (m21 - m12) * s;
  } else if (m11 > m22 && m11 > m33) {
    s = 2 * Math.sqrt(1.0 + m11 - m22 - m33);

    this.w = (m32 - m23) / s;
    this.x = 0.25 * s;
    this.y = (m12 + m21) / s;
    this.z = (m13 + m31) / s;
  } else if (m22 > m33) {
    s = 2 * Math.sqrt(1.0 + m22 - m11 - m33);

    this.w = (m13 - m31) / s;
    this.x = (m12 + m21) / s;
    this.y = 0.25 * s;
    this.z = (m23 + m32) / s;
  } else {
    s = 2 * Math.sqrt(1.0 + m33 - m11 - m22);
    this.w = (m21 - m12) / s;
    this.x = (m13 + m31) / s;
    this.y = (m23 + m32) / s;
    this.z = 0.25 * s;
  }

  return this;
};

Quaternion.prototype.lengthSq = function() {
  return (
    this.x * this.x +
    this.y * this.y +
    this.z * this.z +
    this.w * this.w
  );
};
Quaternion.prototype.length = function() {
  return Math.sqrt(
    this.lengthSq();
  );
};

Quaternion.prototype.normalize = function () {

    var l = this.length();

    if ( l === 0 ) {

        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.w = 1;

    } else {

        l = 1 / l;
        this.x  *= l;
        this.y *= l;
        this.z *= l;
        this.w  *= l;

    }

    return this;

};
Quaternion.prototype.multiply = function ( qa, qb ) {

    if ( qb !== undefined ) {
        return this.multiplyQuaternions( qa, qb );
    }
    return this.multiplyQuaternions( this, qa );

};
Quaternion.prototype.multiplyQuaternions = function ( qa, qb ) {

    
    var qax = qa.x, qay = qa.y, qaz = qa.z, qaw = qa.w;
    var qbx = qb.x, qby = qb.y, qbz = qb.z, qbw = qb.w;

    this.x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
    this.y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
    this.z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
    this.w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;

    return this;

};
Quaternion.prototype.copy = function(q){
    this.x = q.x;
    this.y = q.y;
    this.z = q.z;
    this.w = q.w;
    return this;
}
Quaternion.prototype.slerp = function ( q, t,qt ) {

    if(t == 0)return this;
    if(t == 1)return qt.copy(q);
    var x = this.x, y = this.y, z = this.z, w = this.w;

		var cosHalfTheta = w * q.w + x * q.x + y * q.y + z * q.z;

		if ( cosHalfTheta < 0 ) {

			this.w = - q.w;
			this.x = - q.x;
			this.y = - q.y;
			this.z = - q.z;

			cosHalfTheta = - cosHalfTheta;

		} else {

			this.copy( q );

		}

		if ( cosHalfTheta >= 1.0 ) {

			this.w = w;
			this.x = x;
			this.y = y;
			this.z = z;

			return this;

		}

		var sqrSinHalfTheta = 1 - cosHalfTheta * cosHalfTheta;

		if ( sqrSinHalfTheta <= Number.EPSILON ) {

			var s = 1 - t;
			this.w = s * w + t * this.w;
			this.x = s * x + t * this.x;
			this.y = s * y + t * this.y;
			this.z = s * z + t * this.z;

			return this.normalize();

		}

		var sinHalfTheta = Math.sqrt( sqrSinHalfTheta );
		var halfTheta = Math.atan2( sinHalfTheta, cosHalfTheta );
		var ratioA = Math.sin( ( 1 - t ) * halfTheta ) / sinHalfTheta,
			ratioB = Math.sin( t * halfTheta ) / sinHalfTheta;

		this.w = ( w * ratioA + this.w * ratioB );
		this.x = ( x * ratioA + this.x * ratioB );
		this.y = ( y * ratioA + this.y * ratioB );
		this.z = ( z * ratioA + this.z * ratioB );

		return this;

};

