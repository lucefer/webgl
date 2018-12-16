
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
    var x = euler.x,
        y = euler.y,
        z = euler.z,
        order = euler.order;

    var cos = Math.cos;
    var sin = Math.sin;

    var c1 = cos(x / 2);
    var c2 = cos(y / 2);
    var c3 = cos(z / 2);

    var s1 = sin(x / 2);
    var s2 = sin(y / 2);
    var s3 = sin(z / 2);

    if (order === 'XYZ') {

        this.x = s1 * c2 * c3 + c1 * s2 * s3;
        this.y = c1 * s2 * c3 - s1 * c2 * s3;
        this.z = c1 * c2 * s3 + s1 * s2 * c3;
        this.w = c1 * c2 * c3 - s1 * s2 * s3;

    } else if (order === 'YXZ') {

        this.x = s1 * c2 * c3 + c1 * s2 * s3;
        this.y = c1 * s2 * c3 - s1 * c2 * s3;
        this.z = c1 * c2 * s3 - s1 * s2 * c3;
        this.w = c1 * c2 * c3 + s1 * s2 * s3;

    } else if (order === 'ZXY') {

        this.x = s1 * c2 * c3 - c1 * s2 * s3;
        this.y = c1 * s2 * c3 + s1 * c2 * s3;
        this.z = c1 * c2 * s3 + s1 * s2 * c3;
        this.w = c1 * c2 * c3 - s1 * s2 * s3;

    } else if (order === 'ZYX') {

        this.x = s1 * c2 * c3 - c1 * s2 * s3;
        this.y = c1 * s2 * c3 + s1 * c2 * s3;
        this.z = c1 * c2 * s3 - s1 * s2 * c3;
        this.w = c1 * c2 * c3 + s1 * s2 * s3;

    } else if (order === 'YZX') {

        this.x = s1 * c2 * c3 + c1 * s2 * s3;
        this.y = c1 * s2 * c3 + s1 * c2 * s3;
        this.z = c1 * c2 * s3 - s1 * s2 * c3;
        this.w = c1 * c2 * c3 - s1 * s2 * s3;

    } else if (order === 'XZY') {

        this.x = s1 * c2 * c3 - c1 * s2 * s3;
        this.y = c1 * s2 * c3 - s1 * c2 * s3;
        this.z = c1 * c2 * s3 + s1 * s2 * c3;
        this.w = c1 * c2 * c3 + s1 * s2 * s3;

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

    this.x = axis.x * s;
    this.y = axis.y * s;
    this.z = axis.z * s;
    this.w = Math.cos( halfAngle );

    return this;

};


/**
 *求出当前四元数旋转到目标四元数所经过的角度。
 *
 * q，目标四元数。
 */
Quaternion.prototype.angleTo = function ( q ) {
    // dot(this, q) 求出当前四元数与目标四元数的夹角的余弦值。
    return 2 * Math.acos( Math.abs( window.lib3d.math.clamp( this.dot( q ), - 1, 1 ) ) );

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

    this.x *= - 1;
    this.y *= - 1;
    this.z *= - 1;

    return this;

};
/**
 *求四元数的点积
 *
 * q，待乘四元数
 */
Quaternion.prototype.dot = function (q) {

    return this.x * q.x + this.y * q.y + this.z * q.z + this.w * q._w;

};