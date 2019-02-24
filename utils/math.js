(function (lib3d) {
	function deg2radians(deg) {
		return Math.PI / 180 * deg;
	}

	function radians2deg(radians) {
		return radians * 180 / Math.PI;
	}

	function clamp(value, min, max) {
		return Math.max(min, Math.min(value, max));
	}
	lib3d.math = {
		deg2radians: deg2radians,
		radians2deg: radians2deg,
		clamp: clamp
	}
})(window.lib3d || (window.lib3d = {}))
