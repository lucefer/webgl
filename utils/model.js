//模型类
function Model(name, isDraw) {
    this.uniforms = {};
    this.u_Matrix = null;
    this.bufferInfo = {};
    this.parent = null;
    this.children = [];
    this.rotation = [0, 0, 0];
    this.translation = [0, 0, 0];
    this.scalation = [1, 1, 1];
    this.origination = [0, 0, 0];
    if (isDraw === false) {
      this.isDraw = isDraw;
    } else {
      this.isDraw = true;
    }
  
    this.name = name || '未命名';
    this.localMatrix = matrix.identity();
    this.worldMatrix = matrix.identity();
  }
  Model.prototype.setParent = function(parent) {
    // 若当前模型有父节点，从父节点中移除
    if (this.parent) {
      let index = this.parent.children.indexOf(this);
      if (index >= 0) {
        this.parent.children.splice(index, 1);
      }
    }
    // 将模型添加到指定 parent 节点的子列表尾部。
    if (parent) {
      parent.children.push(this);
    }
    this.parent = parent || null;
  };
  Model.prototype.updateLocalMatrix = function(newMatrix) {
    matrix.multiply(newMatrix, this.localMatrix, this.localMatrix);
  };
  Model.prototype.updateWorldMatrix = function(
    newMatrix,
    viewMatrix,
    projectionMatrix
  ) {
    this.getWorldMatrix(this.worldMatrix);
    this.u_ModelMatrix = this.worldMatrix;
    this.uniforms.u_ModelMatrix = this.u_ModelMatrix;
    this.uniforms.u_Matrix = matrix.multiply(viewMatrix, this.u_ModelMatrix);
    this.uniforms.u_Matrix = matrix.multiply(
      projectionMatrix,
      this.uniforms.u_Matrix
    );
  };
  Model.prototype.setBufferInfo = function(bufferInfo) {
    this.bufferInfo = bufferInfo || {};
  };
  Model.prototype.setOrigin = function(ox, oy, oz) {
    if (Array.isArray(ox)) {
      this.origination = [ox[0] || 0, ox[1] || 0, ox[2] || 0];
      return;
    }
    this.origination = [ox || 0, oy || 0, oz || 0];
  };
  Model.prototype.setUniforms = function(uniforms) {
    for (let i in uniforms) {
      this.uniforms[i] = uniforms[i];
    }
  };
  Model.prototype.clone = function() {
    let target = new Model(this.name);
    for (let i in this) {
      if (typeof this[i] !== 'object') {
        target[i] = this[i];
      } else {
        if (Array.isArray(this[i])) {
          target[i] = this[i].slice(0);
        } else if (this[i] && this[i].buffer instanceof ArrayBuffer) {
          target[i] = this[i].slice(0);
        } else {
          target[i] = this[i];
        }
      }
    }
    return target;
  };
  Model.prototype.getWorldMatrix = function(worldMatrix) {
    if (worldMatrix) {
      this.worldMatrix = matrix.multiply(
        worldMatrix,
        this.localMatrix,
        this.worldMatrix
      );
    } else {
      this.worldMatrix = this.localMatrix;
    }
    let currentWorldMatrix = this.worldMatrix;
    this.children.forEach(function(model) {
      model.getWorldMatrix(currentWorldMatrix);
    });
  };
  Model.prototype.translate = function(tx, ty, tz) {
    if (Array.isArray(tx)) {
      this.translateX(tx[0]);
      this.translateY(tx[1]);
      this.translateZ(tx[2]);
      return;
    }
    this.translateX(tx);
    this.translateY(ty);
    this.translateZ(tz);
  };
  Model.prototype.translateX = function(tx) {
    this.translation[0] = tx || 0;
  };
  Model.prototype.translateY = function(ty) {
    this.translation[1] = ty || 0;
  };
  Model.prototype.translateZ = function(tz) {
    this.translation[2] = tz || 0;
  };
  
  Model.prototype.scale = function(sx, sy, sz) {
    if (Array.isArray(sx)) {
      this.scaleX(sx[0]);
      this.scaleY(sx[1]);
      this.scaleZ(sx[2]);
      return;
    }
    this.scaleX(sx);
    this.scaleY(sy);
    this.scaleZ(sz);
  };
  Model.prototype.scaleX = function(sx) {
    this.scalation[0] = sx || 1;
  };
  Model.prototype.scaleY = function(sy) {
    this.scalation[1] = sy || 1;
  };
  Model.prototype.scaleZ = function(sz) {
    this.scalation[2] = sz || 1;
  };
  
  Model.prototype.rotate = function(rx, ry, rz) {
    if (Array.isArray(rx)) {
      this.rotateX(rx[0]);
      this.rotateY(rx[1]);
      this.rotateZ(rx[2]);
      return;
    }
    this.rotateX(rx);
    this.rotateY(ry);
    this.rotateZ(rz);
  };
  Model.prototype.rotateX = function(rx) {
    this.rotation[0] = rx || 0;
  };
  Model.prototype.rotateY = function(ry) {
    this.rotation[1] = ry || 0;
  };
  Model.prototype.rotateZ = function(rz) {
    this.rotation[2] = rz || 0;
  };
  
  function degToRadians(deg) {
    return (Math.PI / 180) * deg;
  }
  Model.prototype.preRender = function(viewMatrix, projectionMatrix) {
    let modelMatrix = matrix.identity(this.localMatrix);
    if (this.translation) {
      modelMatrix = matrix.translate(
        modelMatrix,
        this.translation[0],
        this.translation[1],
        this.translation[2]
      );
    }
    /*
    modelMatrix = matrix.translate(
      modelMatrix,
      this.origination[0] * this.scalation[0],
      this.origination[1] * this.scalation[1],
      this.origination[2] * this.scalation[2]
    );
  */
    if (this.rotation) {
      if (this.rotation[0] !== undefined)
        modelMatrix = matrix.rotateX(modelMatrix, degToRadians(this.rotation[0]));
      if (this.rotation[1] !== undefined)
        modelMatrix = matrix.rotateY(modelMatrix, degToRadians(this.rotation[1]));
      if (this.rotation[2] !== undefined)
        modelMatrix = matrix.rotateZ(modelMatrix, degToRadians(this.rotation[2]));
    }
    modelMatrix = matrix.translate(
      modelMatrix,
      -this.origination[0] * this.scalation[0],
      -this.origination[1] * this.scalation[1],
      -this.origination[2] * this.scalation[2]
    );
    if (this.scalation) {
      modelMatrix = matrix.scale(
        modelMatrix,
        this.scalation[0],
        this.scalation[1],
        this.scalation[2]
      );
    }
  
    this.localMatrix = modelMatrix;
    this.children.forEach(function(child) {
      child.preRender(viewMatrix, projectionMatrix);
    });
    if (!this.parent) {
      this.getWorldMatrix();
    }
  
    this.u_Matrix = matrix.multiply(viewMatrix, this.worldMatrix, this.u_Matrix);
    this.u_Matrix = matrix.multiply(
      projectionMatrix,
      this.u_Matrix,
      this.u_Matrix
    );
  
    this.uniforms.u_Matrix = this.u_Matrix;
    this.uniforms.u_ModelMatrix = this.worldMatrix;
  };
  