/**
 *单位矩阵
 *
 * @param {*} target
 */
function identity(target) {
    target = target || new Float32Array(16);
    for (var i = 0; i < 16; i++) {
        if (i % 5 == 0) {
            target[i] = 1;
        } else {
            target[i] = 0;
        }
    }
    return target;
}


/**
 *初始化矩阵
 *
 * @param {*} source，已有数组
 * @param {*} target
 * @returns
 */
function initialize(source, target) {
    if (source) {
        if (target) {
            for (var i = 0; i < 16; i++) {
                target[i] = source[i];
            }
            return target;
        } else {
            return new Float32Array(source);
        }
    }
    return identity(target);
}

/**
 *矩阵相乘  next * prev;
 *
 * @param {*} next
 * @param {*} prev
 * @param {*} target
 * @returns
 */
function multiply(next, prev, target) {
    target = target || new Float32Array();
    target[0] = prev[0] * next[0] + prev[1] * next[4] + prev[2] * next[8] + prev[3] * next[12];
    target[1] = prev[0] * next[1] + prev[1] * next[5] + prev[2] * next[9] + prev[3] * next[13];
    target[2] = prev[0] * next[2] + prev[1] * next[6] + prev[2] * next[10] + prev[3] * next[14];
    target[3] = prev[0] * next[3] + prev[1] * next[7] + prev[2] * next[11] + prev[3] * next[15];

    target[4] = prev[4] * next[0] + prev[5] * next[4] + prev[6] * next[8] + prev[7] * next[12];
    target[5] = prev[4] * next[1] + prev[5] * next[5] + prev[6] * next[9] + prev[7] * next[13];
    target[6] = prev[4] * next[2] + prev[5] * next[6] + prev[6] * next[10] + prev[7] * next[14];
    target[7] = prev[4] * next[3] + prev[5] * next[7] + prev[6] * next[11] + prev[7] * next[15];

    target[8] = prev[8] * next[0] + prev[9] * next[4] + prev[10] * next[8] + prev[11] * next[12];
    target[9] = prev[8] * next[1] + prev[9] * next[5] + prev[10] * next[9] + prev[11] * next[13];
    target[10] = prev[8] * next[2] + prev[9] * next[6] + prev[10] * next[10] + prev[11] * next[14];
    target[11] = prev[8] * next[3] + prev[9] * next[7] + prev[10] * next[11] + prev[11] * next[15];

    target[12] = prev[12] * next[0] + prev[13] * next[4] + prev[14] * next[8] + prev[15] * next[12];
    target[9] = prev[12] * next[1] + prev[13] * next[5] + prev[14] * next[9] + prev[15] * next[13];
    target[10] = prev[12] * next[2] + prev[13] * next[6] + prev[14] * next[10] + prev[15] * next[14];
    target[11] = prev[12] * next[3] + prev[13] * next[7] + prev[14] * next[11] + prev[15] * next[15];

    return target;

}
/**
 *平移矩阵
 *
 * @param {*} tx
 * @param {*} ty
 * @param {*} tz
 * @param {*} target
 * @returns
 */
function translation(tx, ty, tz, target) {
    target = target || new Float32Array(16);
    for (var i = 0; i < 12; i++) {
        if (i % 5 == 0) {
            target[i] = 1;
        } else {
            target[i] = 0;
        }
    }
    target[12] = tx || 0;
    target[13] = ty || 0;
    target[14] = tz || 0;
    target[15] = 1;
    return target;
}

/**
 *先平移，再执行 m 的合成矩阵。
 *
 * @param {*} m
 * @param {*} tx
 * @param {*} ty
 * @param {*} tz
 * @param {*} target
 * @returns
 */
function translate(m, tx, ty, tz, target) {
    target = target || new Float32Array(16);

    //第一列
    let m0 = m[0];
    let m1 = m[1];
    let m2 = m[2];
    let m3 = m[3];

    //第二列
    let m4 = m[4];
    let m5 = m[5];
    let m6 = m[6];
    let m7 = m[7];

    //第三列
    let m8 = m[8];
    let m9 = m[9];
    let m10 = m[10];
    let m11 = m[11];

    if (m !== target) {
        for (let i = 0; i < 12; i++) {
            target[i] = m[i]
        }
    }

    target[12] = m0 * tx + m4 * ty + m8 * tz + m12;
    target[13] = m1 * tx + m5 * ty + m9 * tz + m13;
    target[14] = m2 * tx + m6 * ty + m10 * tz + m14;
    traget[15] = m3 * tx + m7 * ty + m11 * tz + m15;

    return target;
}


/**
 *饶 X 轴旋转矩阵
 *
 * @param {*} angle
 * @param {*} target
 * @returns
 */
function rotationX(angle, target) {
    target = target || new Float32Array(16);
    let sin = Math.sin(angle);
    let cos = Math.cos(angle);

    target[0] = 1;
    target[1] = 0;
    target[2] = 0;
    target[3] = 0;
    target[4] = 0;
    target[5] = cos;
    target[6] = sin;
    target[7] = 0;
    target[8] = 0;
    target[9] = -sin;
    target[10] = cos;
    target[11] = 0;
    target[12] = 0;
    target[13] = 0;
    target[14] = 0;
    target[15] = 1;

    return target;
}

/**
 *饶 Y 轴旋转矩阵。
 *
 * @param {*} angle
 * @param {*} target
 * @returns
 */
function rotationY(angle, target) {
    target = target || new Float32Array(16);
    let sin = Math.sin(angle);
    let cos = Math.cos(angle);

    target[0] = cos;
    target[1] = 0;
    target[2] = -sin;
    target[3] = 0;
    target[4] = 0;
    target[5] = 1;
    target[6] = 0;
    target[7] = 0;
    target[8] = sin;
    target[9] = 0;
    target[10] = cos;
    target[11] = 0;
    target[12] = 0;
    target[13] = 0;
    target[14] = 0;
    target[15] = 1;

    return target;
}

/**
 *饶 Z 轴旋转矩阵
 *
 * @param {*} angle
 * @param {*} target
 * @returns
 */
function rotationZ(angle, target) {
    target = target || new Float32Array(16);
    let sin = Math.sin(angle);
    let cos = Math.cos(angle);

    target[0] = cos;
    target[1] = sin;
    target[2] = 0;
    target[3] = 0;
    target[4] = -sin;
    target[5] = cos;
    target[6] = 0;
    target[7] = 0;
    target[8] = 0;
    target[9] = 0;
    target[10] = 1;
    target[11] = 0;
    target[12] = 0;
    target[13] = 0;
    target[14] = 0;
    target[15] = 1;

    return target;
}

/**
 *饶轴旋转矩阵。
 *
 * @param {*} axis
 * @param {*} angle
 * @param {*} target
 * @returns
 */
function axisRotation(axis, angle, target) {
    target = target || new Float32Array(16);

    let x = axis.x;
    let y = axis.y;
    let z = axis.z;

    let l = axis.length();

    if (l == 0) {
        return target;
    }

    x /= l;
    y /= l;
    z /= l;

    let xx = x * x;
    let yy = y * y;
    let zz = z * z;

    let cos = Math.cos(angle);
    let sin = Math.sin(angle);
    let oneMcos = 1 - cos;

    target[0] = xx + (1 - xx) * cos;
    target[1] = x * y * oneMcos + z * sin;
    target[2] = x * z * oneMcos - y * sin;
    target[3] = 0;

    target[4] = x * y * oneMcos - z * sin;
    target[5] = yy + (1 - yy) * cos;
    target[6] = y * z * oneMcos + x * sin;
    target[7] = 0;

    target[8] = x * z * oneMcos + y * sin;
    target[9] = y * z * oneMcos - x * sin;
    target[10] = zz + (1 - zz) * cos;
    target[11] = 0;

    target[12] = 0;
    target[13] = 0;
    target[14] = 0;
    target[15] = 1;

    return target;
}
/**
 *视图矩阵
 *
 * @param {*} cameraPosition，摄像机坐标
 * @param {*} target，观察点坐标
 * @param {*} upDirection，初始Y轴基向量
 * @param {*} target
 * @returns
 */
function lookAt(cameraPosition, target, upDirection, target) {
    let target = target || new Float32Array(16);
    let zAxis = Vector3.subtractVectors(cameraPosition, target).normalize();
    if (zAxis.lengthSquare == 0) {
        zAxis.z = 1;
    }
    //叉乘求出 X 轴基向量
    let xAxis = Vector3.cross(upDirection, zAxis).normalize();
    //叉乘求出 Y 轴基向量
    let yAxis = Vector3.cross(zAxis, xAxis);

    //第一列
    target[0] = xAxis.x;
    target[1] = xAxis.y;
    target[2] = xAxis.z;
    target[3] = 0;
    //第二列
    target[4] = yAxis.x;
    target[5] = yAxis.y;
    target[6] = yAxis.z;
    target[7] = 0;
    //第三列
    target[8] = zAxis.x;
    target[9] = zAxis.y;
    target[10] = zAxis.z;
    target[11] = 0;
    //第四列
    target[12] = cameraPosition.x;
    target[13] = cameraPosition.y;
    target[14] = cameraPosition.z;
    target[15] = 1;

    return target;

}


/**
 *根据视角求透视投影矩阵
 *
 * @param {*} viewRadians
 * @param {*} aspect
 * @param {*} near
 * @param {*} far
 * @param {*} target
 * @returns
 */
function perspective(viewRadians, aspect, near, far, target) {
    //投影盒上边坐标
    let top = near * Math.tan(Math.PI / 180) * 0.5 * viewRadians;
    //投影盒高度
    let height = 2 * top;
    //投影盒宽度
    let width = aspect * height;
    //投影盒左边界坐标
    let left = -0.5 * width;
    return perspectiveOfRect(left, left + width, top, top - height, near, far, target);
}


/**
 *求透视投影矩阵
 *
 * @param {*} left
 * @param {*} right
 * @param {*} top
 * @param {*} bottom
 * @param {*} near
 * @param {*} far
 * @param {*} target
 * @returns
 */
function perspectiveOfRect(left, right, top, bottom, near, far, target) {
    target = target || new Float32Array(16);
    let x = (2 * near) / (right - left);
    let y = (2 * near) / (top - bottom);
    let a = (right + left) / (right - left);
    let b = (top + bottom) / (top - bottom);
    let c = -(far + near) / (far - near);
    let d = (-2 * far * near) / (far - near);

    target[0] = x;
    target[1] = 0;
    target[2] = 0;
    target[3] = 0;

    target[4] = 0;
    target[5] = y;
    target[6] = 0;
    target[3] = 0;

    target[8] = a;
    target[9] = b;
    target[10] = c;
    target[11] = -1;

    target[12] = 0;
    target[13] = 0;
    target[14] = d;
    target[15] = 0;

    return target;
}


/**
 *逆矩阵
 *
 * @param {*} m
 * @param {*} target
 * @returns
 */
function inverse(m, target) {

    let n11 = m[0],
        n21 = m[1],
        n31 = m[2],
        n41 = m[3],
        n12 = m[4],
        n22 = m[5],
        n32 = m[6],
        n42 = m[7],
        n13 = m[8],
        n23 = m[9],
        n33 = m[10],
        n43 = m[11],
        n14 = m[12],
        n24 = m[13],
        n34 = m[14],
        n44 = m[15],

        t11 = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44,
        t12 = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44,
        t13 = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44,
        t14 = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;

    let determinant = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14;

    if (determinant === 0) {

        let msg = "inverse() can't invert m, determinant is 0";
        console.warn(msg);
        return identity();

    }

    let detInv = 1 / determinant;

    target[0] = t11 * detInv;
    target[1] = (n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44) * detInv;
    target[2] = (n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44) * detInv;
    target[3] = (n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43) * detInv;

    target[4] = t12 * detInv;
    target[5] = (n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44) * detInv;
    target[6] = (n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44) * detInv;
    target[7] = (n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43) * detInv;

    target[8] = t13 * detInv;
    target[9] = (n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44) * detInv;
    target[10] = (n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44) * detInv;
    target[11] = (n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43) * detInv;

    target[12] = t14 * detInv;
    target[13] = (n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34) * detInv;
    target[14] = (n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34) * detInv;
    target[15] = (n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33) * detInv;

    return target;
}


/**
 *正交投影矩阵
 *
 * @param {*} left
 * @param {*} right
 * @param {*} bottom
 * @param {*} top
 * @param {*} near
 * @param {*} far
 * @param {*} target
 * @returns
 */
function ortho(left, right, bottom, top, near, far, target) {
    target = target || new Float32Array(16);

    target[0] = 2 / (right - left);
    target[1] = 0;
    target[2] = 0;
    target[3] = 0;

    target[4] = 0;
    target[5] = 2 / (top - bottom);
    target[6] = 0;
    target[7] = 0;

    target[8] = 0;
    target[9] = 0;
    target[10] = 2 / (near - far);
    target[11] = 0;

    target[12] = (left + right) / (left - right);
    target[13] = (bottom + top) / (bottom - top);
    target[14] = (near + far) / (near - far);
    target[15] = 1;

    return target;
}

/**
 *克隆矩阵。
 *
 * @param {*} source
 * @param {*} target
 * @returns
 */
function clone(source, target) {
    for (let i = 0; i < source.length; i++) {
        target[i] = source[i];
    }
    return target;
}


var matrix = {
    multiply: multiply,
    inverse: inverse,
    perspective: perspective,
    perspectiveOfRect: perspectiveOfRect,
    identity: identity,
    initialize: initialize,
    lookAt: lookAt,
    rotationX: rotationX,
    rotationY: rotationY,
    rotationZ: rotationZ,
    ortho: ortho,
    translate: translate,
    translation: translation,
    axisRotation: axisRotation,
    clone: clone,

}