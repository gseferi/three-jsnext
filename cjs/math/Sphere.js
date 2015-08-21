Object.defineProperty(exports, '__esModule', {
	value: true
});

var _Box3 = require('./Box3');

var _Vector3 = require('./Vector3');

/**
 * @author bhouston / http://exocortex.com
 * @author mrdoob / http://mrdoob.com/
 */

function THREE$Sphere(center, radius) {
	this.isSphere = true;

	this.center = center !== undefined ? center : new _Vector3.THREE$Vector3();
	this.radius = radius !== undefined ? radius : 0;
};

THREE$Sphere.prototype = {

	constructor: THREE$Sphere,

	set: function (center, radius) {

		this.center.copy(center);
		this.radius = radius;

		return this;
	},

	setFromPoints: (function () {

		var box = new _Box3.THREE$Box3();

		return function (points, optionalCenter) {

			var center = this.center;

			if (optionalCenter !== undefined) {

				center.copy(optionalCenter);
			} else {

				box.setFromPoints(points).center(center);
			}

			var maxRadiusSq = 0;

			for (var i = 0, il = points.length; i < il; i++) {

				maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(points[i]));
			}

			this.radius = Math.sqrt(maxRadiusSq);

			return this;
		};
	})(),

	clone: function () {

		return new this.constructor().copy(this);
	},

	copy: function (sphere) {

		this.center.copy(sphere.center);
		this.radius = sphere.radius;

		return this;
	},

	empty: function () {

		return this.radius <= 0;
	},

	containsPoint: function (point) {

		return point.distanceToSquared(this.center) <= this.radius * this.radius;
	},

	distanceToPoint: function (point) {

		return point.distanceTo(this.center) - this.radius;
	},

	intersectsSphere: function (sphere) {

		var radiusSum = this.radius + sphere.radius;

		return sphere.center.distanceToSquared(this.center) <= radiusSum * radiusSum;
	},

	clampPoint: function (point, optionalTarget) {

		var deltaLengthSq = this.center.distanceToSquared(point);

		var result = optionalTarget || new _Vector3.THREE$Vector3();
		result.copy(point);

		if (deltaLengthSq > this.radius * this.radius) {

			result.sub(this.center).normalize();
			result.multiplyScalar(this.radius).add(this.center);
		}

		return result;
	},

	getBoundingBox: function (optionalTarget) {

		var box = optionalTarget || new _Box3.THREE$Box3();

		box.set(this.center, this.center);
		box.expandByScalar(this.radius);

		return box;
	},

	applyMatrix4: function (matrix) {

		this.center.applyMatrix4(matrix);
		this.radius = this.radius * matrix.getMaxScaleOnAxis();

		return this;
	},

	translate: function (offset) {

		this.center.add(offset);

		return this;
	},

	equals: function (sphere) {

		return sphere.center.equals(this.center) && sphere.radius === this.radius;
	}

};

exports.THREE$Sphere = THREE$Sphere;