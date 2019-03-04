(function(window) {
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
    target = target || new Float32Array(16);
    // 第一列
    var p00 = prev[0];
    var p10 = prev[1];
    var p20 = prev[2];
    var p30 = prev[3];
    // 第二列
    var p01 = prev[4];
    var p11 = prev[5];
    var p21 = prev[6];
    var p31 = prev[7];
    // 第三列
    var p02 = prev[8];
    var p12 = prev[9];
    var p22 = prev[10];
    var p32 = prev[11];

    // 第四列
    var p03 = prev[12];
    var p13 = prev[13];
    var p23 = prev[14];
    var p33 = prev[15];

    // 第一行
    var n00 = next[0];
    var n01 = next[4];
    var n02 = next[8];
    var n03 = next[12];
    // 第二行
    var n10 = next[1];
    var n11 = next[5];
    var n12 = next[9];
    var n13 = next[13];
    // 第三行
    var n20 = next[2];
    var n21 = next[6];
    var n22 = next[10];
    var n23 = next[14];

    // 第四行
    var n30 = next[3];
    var n31 = next[7];
    var n32 = next[11];
    var n33 = next[15];

    target[0] = p00 * n00 + p10 * n01 + p20 * n02 + p30 * n03;
    target[1] = p00 * n10 + p10 * n11 + p20 * n12 + p30 * n13;
    target[2] = p00 * n20 + p10 * n21 + p20 * n22 + p30 * n23;
    target[3] = p00 * n30 + p10 * n31 + p20 * n32 + p30 * n33;

    target[4] = p01 * n00 + p11 * n01 + p21 * n02 + p31 * n03;
    target[5] = p01 * n10 + p11 * n11 + p21 * n12 + p31 * n13;
    target[6] = p01 * n20 + p11 * n21 + p21 * n22 + p31 * n23;
    target[7] = p01 * n30 + p11 * n31 + p21 * n32 + p31 * n33;

    target[8] = p02 * n00 + p12 * n01 + p22 * n02 + p32 * n03;
    target[9] = p02 * n10 + p12 * n11 + p22 * n12 + p32 * n13;
    target[10] = p02 * n20 + p12 * n21 + p22 * n22 + p32 * n23;
    target[11] = p02 * n30 + p12 * n31 + p22 * n32 + p32 * n33;

    target[12] = p03 * n00 + p13 * n01 + p23 * n02 + p33 * n03;
    target[13] = p03 * n10 + p13 * n11 + p23 * n12 + p33 * n13;
    target[14] = p03 * n20 + p13 * n21 + p23 * n22 + p33 * n23;
    target[15] = p03 * n30 + p13 * n31 + p23 * n32 + p33 * n33;

    return target;
  }
  /**
   *矩阵相乘  next * prev;
   *
   * @param {*} next
   * @param {*} prev
   * @param {*} target
   * @returns
   */
  function multiplyScalar(m, scalar, target) {
    target = target || new Float32Array(16);

    target[0] = p00 * n00 + p10 * n01 + p20 * n02 + p30 * n03;
    target[1] = p00 * n10 + p10 * n11 + p20 * n12 + p30 * n13;
    target[2] = p00 * n20 + p10 * n21 + p20 * n22 + p30 * n23;
    target[3] = p00 * n30 + p10 * n31 + p20 * n32 + p30 * n33;

    target[4] = p01 * n00 + p11 * n01 + p21 * n02 + p31 * n03;
    target[5] = p01 * n10 + p11 * n11 + p21 * n12 + p31 * n13;
    target[6] = p01 * n20 + p11 * n21 + p21 * n22 + p31 * n23;
    target[7] = p01 * n30 + p11 * n31 + p21 * n32 + p31 * n33;

    target[8] = p02 * n00 + p12 * n01 + p22 * n02 + p32 * n03;
    target[9] = p02 * n10 + p12 * n11 + p22 * n12 + p32 * n13;
    target[10] = p02 * n20 + p12 * n21 + p22 * n22 + p32 * n23;
    target[11] = p02 * n30 + p12 * n31 + p22 * n32 + p32 * n33;

    target[12] = p03 * n00 + p13 * n01 + p23 * n02 + p33 * n03;
    target[13] = p03 * n10 + p13 * n11 + p23 * n12 + p33 * n13;
    target[14] = p03 * n20 + p13 * n21 + p23 * n22 + p33 * n23;
    target[15] = p03 * n30 + p13 * n31 + p23 * n32 + p33 * n33;

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
    var m0 = m[0];
    var m1 = m[1];
    var m2 = m[2];
    var m3 = m[3];

    //第二列
    var m4 = m[4];
    var m5 = m[5];
    var m6 = m[6];
    var m7 = m[7];

    //第三列
    var m8 = m[8];
    var m9 = m[9];
    var m10 = m[10];
    var m11 = m[11];
    //第四列
    var m12 = m[12];
    var m13 = m[13];
    var m14 = m[14];
    var m15 = m[15];
    if (m !== target) {
      for (var i = 0; i < 12; i++) {
        target[i] = m[i];
      }
    }

    target[12] = m0 * tx + m4 * ty + m8 * tz + m12;
    target[13] = m1 * tx + m5 * ty + m9 * tz + m13;
    target[14] = m2 * tx + m6 * ty + m10 * tz + m14;
    target[15] = m3 * tx + m7 * ty + m11 * tz + m15;

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
    var sin = Math.sin(angle);
    var cos = Math.cos(angle);

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
    var sin = Math.sin(angle);
    var cos = Math.cos(angle);

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
    var sin = Math.sin(angle);
    var cos = Math.cos(angle);

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

  function rotateX(m, angle, target) {
    target = traget || new Float32Array(16);

    var m10 = m[4];
    var m11 = m[5];
    var m12 = m[6];
    var m13 = m[7];
    var m20 = m[8];
    var m21 = m[9];
    var m22 = m[10];
    var m23 = m[11];
    var cos = Math.cos(angle);
    var sin = Math.sin(angle);

    target[4] = cos * m10 + sin * m20;
    target[5] = cos * m11 + sin * m21;
    target[6] = cos * m12 + sin * m22;
    target[7] = cos * m13 + sin * m23;
    target[8] = cos * m20 - sin * m10;
    target[9] = cos * m21 - sin * m11;
    target[10] = cos * m22 - sin * m12;
    target[11] = cos * m23 - sin * m13;

    if (m !== target) {
      target[0] = m[0];
      target[1] = m[1];
      target[2] = m[2];
      target[3] = m[3];
      target[12] = m[12];
      target[13] = m[13];
      target[14] = m[14];
      target[15] = m[15];
    }

    return target;
  }
  function rotateY(m, angle, target) {
    target = target || new Float32Array(16);

    var m00 = m[0];
    var m01 = m[1];
    var m02 = m[2];
    var m03 = m[3];
    var m20 = m[8];
    var m21 = m[9];
    var m22 = m[10];
    var m23 = m[11];
    var cos = Math.cos(angle);
    var sin = Math.sin(angle);

    target[0] = cos * m00 - sin * m20;
    target[1] = cos * m01 - sin * m21;
    target[2] = cos * m02 - sin * m22;
    target[3] = cos * m03 - sin * m23;
    target[8] = cos * m20 + sin * m00;
    target[9] = cos * m21 + sin * m01;
    target[10] = cos * m22 + sin * m02;
    target[11] = cos * m23 + sin * m03;

    if (m !== target) {
      target[4] = m[4];
      target[5] = m[5];
      target[6] = m[6];
      target[7] = m[7];
      target[12] = m[12];
      target[13] = m[13];
      target[14] = m[14];
      target[15] = m[15];
    }

    return target;
  }
  function rotateZ(m, angle, target) {
    target = target || new Float32Array(16);

    var m00 = m[0];
    var m01 = m[1];
    var m02 = m[2];
    var m03 = m[3];
    var m10 = m[4];
    var m11 = m[5];
    var m12 = m[6];
    var m13 = m[7];

    var cos = Math.cos(angle);
    var sin = Math.sin(angle);

    target[0] = cos * m00 + sin * m10;
    target[1] = cos * m01 + sin * m11;
    target[2] = cos * m02 + sin * m12;
    target[3] = cos * m03 + sin * m13;
    target[4] = cos * m10 - sin * m00;
    target[5] = cos * m11 - sin * m01;
    target[6] = cos * m12 - sin * m02;
    target[7] = cos * m13 - sin * m03;

    if (m !== target) {
      target[8] = m[8];
      target[9] = m[9];
      target[10] = m[10];
      target[11] = m[11];
      target[12] = m[12];
      target[13] = m[13];
      target[14] = m[14];
      target[15] = m[15];
    }

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

    var x = axis.x;
    var y = axis.y;
    var z = axis.z;

    var l = axis.length();

    if (l == 0) {
      return target;
    }

    x /= l;
    y /= l;
    z /= l;

    var xx = x * x;
    var yy = y * y;
    var zz = z * z;

    var cos = Math.cos(angle);
    var sin = Math.sin(angle);

    var oneMcos = 1 - cos;

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
  function lookAt(cameraPosition, lookTarget, upDirection, target) {
    var target = target || new Float32Array(16);
    let zAxis = Vector3.normalize(
      Vector3.subtractVectors(cameraPosition, lookTarget)
    );
    // 如果摄像机位置和目标位置处于同一点
    if (zAxis.lengthSquare() === 0) {
      zAxis.z = 1;
    }

    let xAxis = Vector3.normalize(Vector3.cross(upDirection, zAxis));
    if (xAxis.length() == 0) {
      if (Math.abs(upDirection.z == 1)) {
        zAxis.x += 0.0001;
      } else {
        zAxis.z += 0.0001;
      }
      zAxis.normalize();
      xAxis = Vector3.cross(upDirection, zAxis);
      xAxis.normalize();
    }
    let yAxis = Vector3.normalize(Vector3.cross(zAxis, xAxis));

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
    var top = near * Math.tan(Math.PI / 180) * 0.5 * viewRadians;
    //投影盒高度
    var height = 2 * top;
    //投影盒宽度
    var width = aspect * height;
    //投影盒左边界坐标
    var left = -0.5 * width;
    return perspectiveOfRect(
      left,
      left + width,
      top,
      top - height,
      near,
      far,
      target
    );
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
    var x = (2 * near) / (right - left);
    var y = (2 * near) / (top - bottom);
    var a = (right + left) / (right - left);
    var b = (top + bottom) / (top - bottom);
    var c = -(far + near) / (far - near);
    var d = (-2 * far * near) / (far - near);

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
    var n11 = m[0],
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
      t11 =
        n23 * n34 * n42 -
        n24 * n33 * n42 +
        n24 * n32 * n43 -
        n22 * n34 * n43 -
        n23 * n32 * n44 +
        n22 * n33 * n44,
      t12 =
        n14 * n33 * n42 -
        n13 * n34 * n42 -
        n14 * n32 * n43 +
        n12 * n34 * n43 +
        n13 * n32 * n44 -
        n12 * n33 * n44,
      t13 =
        n13 * n24 * n42 -
        n14 * n23 * n42 +
        n14 * n22 * n43 -
        n12 * n24 * n43 -
        n13 * n22 * n44 +
        n12 * n23 * n44,
      t14 =
        n14 * n23 * n32 -
        n13 * n24 * n32 -
        n14 * n22 * n33 +
        n12 * n24 * n33 +
        n13 * n22 * n34 -
        n12 * n23 * n34;

    var determinant = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14;

    if (determinant === 0) {
      var msg = "inverse() can't invert m, determinant is 0";
      console.warn(msg);
      return identity();
    }
    target = target || new Float32Array(16);
    var detInv = 1 / determinant;

    target[0] = t11 * detInv;
    target[1] =
      (n24 * n33 * n41 -
        n23 * n34 * n41 -
        n24 * n31 * n43 +
        n21 * n34 * n43 +
        n23 * n31 * n44 -
        n21 * n33 * n44) *
      detInv;
    target[2] =
      (n22 * n34 * n41 -
        n24 * n32 * n41 +
        n24 * n31 * n42 -
        n21 * n34 * n42 -
        n22 * n31 * n44 +
        n21 * n32 * n44) *
      detInv;
    target[3] =
      (n23 * n32 * n41 -
        n22 * n33 * n41 -
        n23 * n31 * n42 +
        n21 * n33 * n42 +
        n22 * n31 * n43 -
        n21 * n32 * n43) *
      detInv;

    target[4] = t12 * detInv;
    target[5] =
      (n13 * n34 * n41 -
        n14 * n33 * n41 +
        n14 * n31 * n43 -
        n11 * n34 * n43 -
        n13 * n31 * n44 +
        n11 * n33 * n44) *
      detInv;
    target[6] =
      (n14 * n32 * n41 -
        n12 * n34 * n41 -
        n14 * n31 * n42 +
        n11 * n34 * n42 +
        n12 * n31 * n44 -
        n11 * n32 * n44) *
      detInv;
    target[7] =
      (n12 * n33 * n41 -
        n13 * n32 * n41 +
        n13 * n31 * n42 -
        n11 * n33 * n42 -
        n12 * n31 * n43 +
        n11 * n32 * n43) *
      detInv;

    target[8] = t13 * detInv;
    target[9] =
      (n14 * n23 * n41 -
        n13 * n24 * n41 -
        n14 * n21 * n43 +
        n11 * n24 * n43 +
        n13 * n21 * n44 -
        n11 * n23 * n44) *
      detInv;
    target[10] =
      (n12 * n24 * n41 -
        n14 * n22 * n41 +
        n14 * n21 * n42 -
        n11 * n24 * n42 -
        n12 * n21 * n44 +
        n11 * n22 * n44) *
      detInv;
    target[11] =
      (n13 * n22 * n41 -
        n12 * n23 * n41 -
        n13 * n21 * n42 +
        n11 * n23 * n42 +
        n12 * n21 * n43 -
        n11 * n22 * n43) *
      detInv;

    target[12] = t14 * detInv;
    target[13] =
      (n13 * n24 * n31 -
        n14 * n23 * n31 +
        n14 * n21 * n33 -
        n11 * n24 * n33 -
        n13 * n21 * n34 +
        n11 * n23 * n34) *
      detInv;
    target[14] =
      (n14 * n22 * n31 -
        n12 * n24 * n31 -
        n14 * n21 * n32 +
        n11 * n24 * n32 +
        n12 * n21 * n34 -
        n11 * n22 * n34) *
      detInv;
    target[15] =
      (n12 * n23 * n31 -
        n13 * n22 * n31 +
        n13 * n21 * n32 -
        n11 * n23 * n32 -
        n12 * n21 * n33 +
        n11 * n22 * n33) *
      detInv;

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
    for (var i = 0; i < source.length; i++) {
      target[i] = source[i];
    }
    return target;
  }
  function makeRotationFromEuler(euler, target) {
    target = target || new Float32Array(16);

    var x = euler.x,
      y = euler.y,
      z = euler.z;
    var a = Math.cos(x),
      b = Math.sin(x);
    var c = Math.cos(y),
      d = Math.sin(y);
    var e = Math.cos(z),
      f = Math.sin(z);

    if (euler.order === 'XYZ') {
      var ae = a * e,
        af = a * f,
        be = b * e,
        bf = b * f;

      target[0] = c * e;
      target[4] = -c * f;
      target[8] = d;

      target[1] = af + be * d;
      target[5] = ae - bf * d;
      target[9] = -b * c;

      target[2] = bf - ae * d;
      target[6] = be + af * d;
      target[10] = a * c;
    } else if (euler.order === 'YXZ') {
      var ce = c * e,
        cf = c * f,
        de = d * e,
        df = d * f;

      target[0] = ce + df * b;
      target[4] = de * b - cf;
      target[8] = a * d;

      target[1] = a * f;
      target[5] = a * e;
      target[9] = -b;

      target[2] = cf * b - de;
      target[6] = df + ce * b;
      target[10] = a * c;
    } else if (euler.order === 'ZXY') {
      var ce = c * e,
        cf = c * f,
        de = d * e,
        df = d * f;

      target[0] = ce - df * b;
      target[4] = -a * f;
      target[8] = de + cf * b;

      target[1] = cf + de * b;
      target[5] = a * e;
      target[9] = df - ce * b;

      target[2] = -a * d;
      target[6] = b;
      target[10] = a * c;
    } else if (euler.order === 'ZYX') {
      var ae = a * e,
        af = a * f,
        be = b * e,
        bf = b * f;

      target[0] = c * e;
      target[4] = be * d - af;
      target[8] = ae * d + bf;

      target[1] = c * f;
      target[5] = bf * d + ae;
      target[9] = af * d - be;

      target[2] = -d;
      target[6] = b * c;
      target[10] = a * c;
    } else if (euler.order === 'YZX') {
      var ac = a * c,
        ad = a * d,
        bc = b * c,
        bd = b * d;

      target[0] = c * e;
      target[4] = bd - ac * f;
      target[8] = bc * f + ad;

      target[1] = f;
      target[5] = a * e;
      target[9] = -b * e;

      target[2] = -d * e;
      target[6] = ad * f + bc;
      target[10] = ac - bd * f;
    } else if (euler.order === 'XZY') {
      var ac = a * c,
        ad = a * d,
        bc = b * c,
        bd = b * d;

      target[0] = c * e;
      target[4] = -f;
      target[8] = d * e;

      target[1] = ac * f + bd;
      target[5] = a * e;
      target[9] = ad * f - bc;

      target[2] = bc * f - ad;
      target[6] = b * e;
      target[10] = bd * f + ac;
    }

    // 第四行
    target[3] = 0;
    target[7] = 0;
    target[11] = 0;

    // 第四列
    target[12] = 0;
    target[13] = 0;
    target[14] = 0;
    target[15] = 1;

    return target;
  }
  function makeRotationFromQuaternion(q, target) {
    target = target || new Float32Array(16);
    var x = quaternion.x,
      y = quaternion.y,
      z = quaternion.z,
      w = quaternion.w;
    var x2 = 2 * x,
      y2 = 2 * y,
      z2 = 2 * z;
    var xx = x * x2,
      xy = x * y2,
      xz = x * z2;
    var yy = y * y2,
      yz = y * z2,
      zz = z * z2;
    var wx = w * x2,
      wy = w * y2,
      wz = w * z2;

    target[0] = 1 - (yy + zz);
    target[1] = xy + wz;
    target[2] = xz - wy;
    target[3] = 0;

    target[4] = xy - wz;
    target[5] = 1 - (xx + zz);
    target[6] = yz + wx;
    target[7] = 0;

    target[8] = xz + wy;
    target[9] = yz - wx;
    target[10] = 1 - (xx + yy);
    target[11] = 0;

    target[12] = 0;
    target[13] = 0;
    target[14] = 0;
    target[15] = 1;

    return target;
  }
  function transpose(m, target) {
    target = target || new Float32Array(16);
    //转置矩阵的第一列
    target[0] = m[0];
    target[1] = m[4];
    target[2] = m[8];
    target[3] = m[12];
    //转置矩阵的第二列
    target[4] = m[1];
    target[5] = m[5];
    target[6] = m[9];
    target[7] = m[13];
    //转置矩阵的第三列
    target[8] = m[2];
    target[9] = m[6];
    target[10] = m[10];
    target[11] = m[14];
    //转置矩阵的第四列
    target[12] = m[3];
    target[13] = m[7];
    target[14] = m[11];
    target[15] = m[15];

    return target;
  }

  function scale(m, sx, sy, sz, target) {
    target = target || new Float32Array(16);

    target[0] = sx * m[0 * 4 + 0];
    target[1] = sx * m[0 * 4 + 1];
    target[2] = sx * m[0 * 4 + 2];
    target[3] = sx * m[0 * 4 + 3];
    target[4] = sy * m[1 * 4 + 0];
    target[5] = sy * m[1 * 4 + 1];
    target[6] = sy * m[1 * 4 + 2];
    target[7] = sy * m[1 * 4 + 3];
    target[8] = sz * m[2 * 4 + 0];
    target[9] = sz * m[2 * 4 + 1];
    target[10] = sz * m[2 * 4 + 2];
    target[11] = sz * m[2 * 4 + 3];

    target[12] = m[12];
    target[13] = m[13];
    target[14] = m[14];
    target[15] = m[15];

    return target;
  }
  /**
   *
   *
   * @param {*} sx
   * @param {*} sy
   * @param {*} sz
   * @param {*} target
   * @returns
   */
  function scalation(sx, sy, sz, target) {
    target = target || new Float32Array(16);
    target[0] = sx;
    target[1] = 0;
    target[2] = 0;
    target[3] = 0;
    target[4] = 0;
    target[5] = sy;
    target[6] = 0;
    target[7] = 0;
    target[8] = 0;
    target[9] = 0;
    target[10] = sz;
    target[11] = 0;
    target[12] = 0;
    target[13] = 0;
    target[14] = 0;
    target[15] = 1;
    return target;
  }
  function rotateX(m, angleInRadians, target) {
    // this is the optimized version of
    // return multiply(m, xRotation(angleInRadians), dst);
    target = target || new Float32Array(16);

    var m10 = m[4];
    var m11 = m[5];
    var m12 = m[6];
    var m13 = m[7];
    var m20 = m[8];
    var m21 = m[9];
    var m22 = m[10];
    var m23 = m[11];
    var c = Math.cos(angleInRadians);
    var s = Math.sin(angleInRadians);

    target[4] = c * m10 + s * m20;
    target[5] = c * m11 + s * m21;
    target[6] = c * m12 + s * m22;
    target[7] = c * m13 + s * m23;
    target[8] = c * m20 - s * m10;
    target[9] = c * m21 - s * m11;
    target[10] = c * m22 - s * m12;
    target[11] = c * m23 - s * m13;

    if (m !== target) {
      target[0] = m[0];
      target[1] = m[1];
      target[2] = m[2];
      target[3] = m[3];
      target[12] = m[12];
      target[13] = m[13];
      target[14] = m[14];
      target[15] = m[15];
    }

    return target;
  }

  function applyMatrix(v, m) {
    var x = v.x,
      y = v.y,
      z = v.z,
      w = v.w;
    let that = {};
    that.x = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
    that.y = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
    that.z = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
    that.w = m[3] * x + m[7] * y + m[11] * z + m[15] * w;

    return that;
  }

  function cloneMatrix(source, target) {
    for (let i = 0; i < source.length; i++) {
      target[i] = source[i];
    }
    return target;
  }
  function getMatrixFromEuler(euler, dst) {
    dst = dst || new Float32Array(16);

    let x = euler.x,
      y = euler.y,
      z = euler.z;
    let cx = Math.cos(x),
      sx = Math.sin(x),
      cy = Math.cos(y),
      sy = Math.sin(y),
      cz = Math.cos(z),
      sz = Math.sin(z);
    let sxsz = sx * sz;
    let cxcz = cx * cz;
    let cxsz = cx * sz;
    let sxcz = sx * cz;
    dst[0] = cy * cz;
    dst[1] = sxcz * sy + cxsz;
    dst[2] = sxsz - cxcz * sy;
    dst[3] = 0;

    dst[4] = -cy * sz;
    dst[5] = cxcz - sxsz * sy;
    dst[6] = sxcz + cxsz * sy;
    dst[7] = 0;

    dst[8] = sy;
    dst[9] = -sx * cy;
    dst[10] = cx * cy;
    dst[11] = 0;

    dst[12] = 0;
    dst[13] = 0;
    dst[14] = 0;
    dst[15] = 1;

    return dst;
  }
  window.matrix = {
    multiply: multiply,
    inverse: inverse,
    lookAt: lookAt,
    perspective: perspective,
    perspectiveOfRect: perspectiveOfRect,
    identity: identity,
    initialize: initialize,
    lookAt: lookAt,
    rotationX: rotationX,
    rotationY: rotationY,
    rotationZ: rotationZ,
    scale: scale,
    scalation: scalation,
    rotateX: rotateX,
    rotateY: rotateY,
    rotateZ: rotateZ,
    ortho: ortho,
    getMatrixFromEuler: getMatrixFromEuler,
    translate: translate,
    translation: translation,
    axisRotation: axisRotation,
    clone: clone,
    cloneMatrix: cloneMatrix,
    applyMatrix: applyMatrix,
    transpose: transpose,
    makeRotationFromEuler: makeRotationFromEuler,
    makeRotationFromQuaternion: makeRotationFromQuaternion
  };
})(window);
