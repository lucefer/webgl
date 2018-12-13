
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
    this.w = (w !== undefined) ? w : 1;
}
/**
 *设置 x 分量。
 *
 * @param {*} x
 */
Quaternion.prototype.setX = function (x) {
    this.x = x || 0;
}
/**
 *设置 y 分量。
 *
 * @param {*} y
 */
Quaternion.prototype.setY = function (y) {
    this.y = y || 0;
}
/**
 *设置 z 分量。
 *
 * @param {*} z
 */
Quaternion.prototype.setZ = function (z) {
    this.z = z || 0;
}

/**
 *设置 w 分量。
 *
 * @param {*} w
 */
Quaternion.prototype.setW = function (w) {
    this.w = w;
}

/**
 *欧拉角转四元数
 *
 * euler，欧拉角
 */
Quaternion.prototype.setFromEuler = function (euler) {
    var x = euler._x,
        y = euler._y,
        z = euler._z,
        order = euler.order;

    var cos = Math.cos;
    var sin = Math.sin;

    var c1 = cos(_x / 2);
    var c2 = cos(_y / 2);
    var c3 = cos(_z / 2);

    var s1 = sin(_x / 2);
    var s2 = sin(_y / 2);
    var s3 = sin(_z / 2);

    if (order === 'XYZ') {

        this._x = s1 * c2 * c3 + c1 * s2 * s3;
        this._y = c1 * s2 * c3 - s1 * c2 * s3;
        this._z = c1 * c2 * s3 + s1 * s2 * c3;
        this._w = c1 * c2 * c3 - s1 * s2 * s3;

    } else if (order === 'YXZ') {

        this._x = s1 * c2 * c3 + c1 * s2 * s3;
        this._y = c1 * s2 * c3 - s1 * c2 * s3;
        this._z = c1 * c2 * s3 - s1 * s2 * c3;
        this._w = c1 * c2 * c3 + s1 * s2 * s3;

    } else if (order === 'ZXY') {

        this._x = s1 * c2 * c3 - c1 * s2 * s3;
        this._y = c1 * s2 * c3 + s1 * c2 * s3;
        this._z = c1 * c2 * s3 + s1 * s2 * c3;
        this._w = c1 * c2 * c3 - s1 * s2 * s3;

    } else if (order === 'ZYX') {

        this._x = s1 * c2 * c3 - c1 * s2 * s3;
        this._y = c1 * s2 * c3 + s1 * c2 * s3;
        this._z = c1 * c2 * s3 - s1 * s2 * c3;
        this._w = c1 * c2 * c3 + s1 * s2 * s3;

    } else if (order === 'YZX') {

        this._x = s1 * c2 * c3 + c1 * s2 * s3;
        this._y = c1 * s2 * c3 + s1 * c2 * s3;
        this._z = c1 * c2 * s3 - s1 * s2 * c3;
        this._w = c1 * c2 * c3 - s1 * s2 * s3;

    } else if (order === 'XZY') {

        this._x = s1 * c2 * c3 - c1 * s2 * s3;
        this._y = c1 * s2 * c3 - s1 * c2 * s3;
        this._z = c1 * c2 * s3 + s1 * s2 * c3;
        this._w = c1 * c2 * c3 + s1 * s2 * s3;

    }


    return this;
}


/**
 *饶轴向量的旋转一定角度所对应的四元数
 *
 * axis，轴向量。
 * angle，旋转角度。
 */
Quaternion.prototype.setFromAxisAngle = function ( axis, angle ) {
    // axis 轴向量必须是归一化后的单位向量。
    //根据公式 q = {w: cos(θ/2), x: sin(θ/2)*axis.x, y: sin(θ/2) * axis.y, z: sin(θ/2) * axis.z}
    var halfAngle = angle / 2, s = Math.sin( halfAngle );

    this._x = axis.x * s;
    this._y = axis.y * s;
    this._z = axis.z * s;
    this._w = Math.cos( halfAngle );

    return this;

};


/**
 *求出当前四元数旋转到目标四元数所经过的角度。
 *
 * q，目标四元数。
 */
Quaternion.prototype.angleTo = function ( q ) {
    // dot(this, q) 求出当前四元数与目标四元数的夹角的余弦值。
    return 2 * Math.acos( Math.abs( _Math.clamp( this.dot( q ), - 1, 1 ) ) );

};



/**
 *求四元数的逆
 *
 */
Quaternion.prototype.inverse = function () {
    // 根据公式 q-1 =q*/|q| * |q|，因为单位四元数 |q| = 1，所以，q-1 = q*。
    // 求单位四元数的逆，等同于求该四元数的共轭四元数。
    return this.conjugate();

};

/**
 *求四元数的共轭
 *
 */
Quaternion.prototype.conjugate = function () {

    this._x *= - 1;
    this._y *= - 1;
    this._z *= - 1;

    return this;

};
/**
 *求四元数的点积
 *
 * q，待乘四元数
 */
Quaternion.prototype.dot = function (q) {

    return this._x * q._x + this._y * q._y + this._z * q._z + this._w * q._w;

};