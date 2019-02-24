function getRGBFromColor(color) {
    color = color.startsWith('#') ? color.substr(1) : color;
    var hex = color.split('');
    var r = parseInt(hex[0], 16) * 16 + parseInt(hex[1], 16);
    var g = parseInt(hex[2], 16) * 16 + parseInt(hex[3], 16);
    var b = parseInt(hex[4], 16) * 16 + parseInt(hex[5], 16);
    return {
      r: r,
      g: g,
      b: b
    };
  }

  function getHexColorFromRGB(rgb) {
    return (
      '#' + rgb.r.toString(16) + rgb.g.toString(16) + rgb.b.toString(16)
    );
  }