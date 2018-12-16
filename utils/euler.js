(function (lib3d) {
  function Euler(x, y, z, order) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    this.order = order || 'XYZ';
  }

  Euler.prototype.setX = function (x) {
    this.x = x || 0;
  };

  Euler.prototype.setY = function (y) {
    this.y = y || 0;
  };

  Euler.prototype.setZ = function (z) {
    this.z = z || 0;
  };

  Euler.prototype.setOrder = function (order) {
    this.order = order;
  };

  Euler.prototype.set = function (x, y, z, order) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    this.order = order || this.order;
  };

  Euler.prototype.setFromRotationMatrix = function (m, order) {
    var clamp = window.lib3d.math.clamp;

    var m11 = m[0],
      m12 = m[4],
      m13 = m[8];
    var m21 = m[1],
      m22 = m[5],
      m23 = m[9];
    var m31 = m[2],
      m32 = m[6],
      m33 = m[10];

    order = order || this._order;

    if (order === 'XYZ') {
      this.y = Math.asin(clamp(m13, -1, 1));

      if (Math.abs(m13) < 0.99999) {
        this.x = Math.atan2(-m23, m33);
        this.z = Math.atan2(-m12, m11);
      } else {
        this.x = Math.atan2(m32, m22);
        this.z = 0;
      }
    } else if (order === 'YXZ') {
      this.x = Math.asin(-clamp(m23, -1, 1));

      if (Math.abs(m23) < 0.99999) {
        this.y = Math.atan2(m13, m33);
        this.z = Math.atan2(m21, m22);
      } else {
        this.y = Math.atan2(-m31, m11);
        this.z = 0;
      }
    } else if (order === 'ZXY') {
      this.x = Math.asin(clamp(m32, -1, 1));

      if (Math.abs(m32) < 0.99999) {
        this.y = Math.atan2(-m31, m33);
        this.z = Math.atan2(-m12, m22);
      } else {
        this.y = 0;
        this.z = Math.atan2(m21, m11);
      }
    } else if (order === 'ZYX') {
      this.y = Math.asin(-clamp(m31, -1, 1));

      if (Math.abs(m31) < 0.99999) {
        this.x = Math.atan2(m32, m33);
        this.z = Math.atan2(m21, m11);
      } else {
        this.x = 0;
        this.z = Math.atan2(-m12, m22);
      }
    } else if (order === 'YZX') {
      this.z = Math.asin(clamp(m21, -1, 1));

      if (Math.abs(m21) < 0.99999) {
        this.x = Math.atan2(-m23, m22);
        this.y = Math.atan2(-m31, m11);
      } else {
        this.x = 0;
        this.y = Math.atan2(m13, m33);
      }
    } else if (order === 'XZY') {
      this.z = Math.asin(-clamp(m12, -1, 1));

      if (Math.abs(m12) < 0.99999) {
        this.x = Math.atan2(m32, m22);
        this.y = Math.atan2(m13, m11);
      } else {
        this.x = Math.atan2(-m23, m33);
        this.y = 0;
      }
    } else {
      console.warn('unsupported order: ' + order);
    }

    this.order = order;

    return this;
  };

  Euler.prototype.setFromRotationMatrix = function (m, order) {
    var matrix = new Matrix4();

    return function setFromQuaternion(q, order, update) {
      matrix.makeRotationFromQuaternion(q);

      return this.setFromRotationMatrix(matrix, order, update);
    };
  };
  lib3d.Euler = Euler;
})(window.lib3d || (window.lib3d = {}))