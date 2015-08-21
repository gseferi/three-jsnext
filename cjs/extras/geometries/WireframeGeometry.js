Object.defineProperty(exports, '__esModule', {
	value: true
});

var _coreBufferGeometry = require('../../core/BufferGeometry');

var _coreBufferAttribute = require('../../core/BufferAttribute');

var _coreGeometry = require('../../core/Geometry');

/**
 * @author mrdoob / http://mrdoob.com/
 */

function THREE$WireframeGeometry(geometry) {
	this.isWireframeGeometry = true;

	_coreBufferGeometry.THREE$BufferGeometry.call(this);

	var edge = [0, 0],
	    hash = {};
	var sortFunction = function (a, b) {

		return a - b;
	};

	var keys = ['a', 'b', 'c'];

	if (geometry && geometry.isGeometry) {

		var vertices = geometry.vertices;
		var faces = geometry.faces;
		var numEdges = 0;

		// allocate maximal size
		var edges = new Uint32Array(6 * faces.length);

		for (var i = 0, l = faces.length; i < l; i++) {

			var face = faces[i];

			for (var j = 0; j < 3; j++) {

				edge[0] = face[keys[j]];
				edge[1] = face[keys[(j + 1) % 3]];
				edge.sort(sortFunction);

				var key = edge.toString();

				if (hash[key] === undefined) {

					edges[2 * numEdges] = edge[0];
					edges[2 * numEdges + 1] = edge[1];
					hash[key] = true;
					numEdges++;
				}
			}
		}

		var coords = new Float32Array(numEdges * 2 * 3);

		for (var i = 0, l = numEdges; i < l; i++) {

			for (var j = 0; j < 2; j++) {

				var vertex = vertices[edges[2 * i + j]];

				var index = 6 * i + 3 * j;
				coords[index + 0] = vertex.x;
				coords[index + 1] = vertex.y;
				coords[index + 2] = vertex.z;
			}
		}

		this.addAttribute('position', new _coreBufferAttribute.THREE$BufferAttribute(coords, 3));
	} else if (geometry && geometry.isBufferGeometry) {

		if (geometry.attributes.index !== undefined) {

			// Indexed BufferGeometry

			var vertices = geometry.attributes.position;
			var indices = geometry.attributes.index.array;
			var drawcalls = geometry.drawcalls;
			var numEdges = 0;

			if (drawcalls.length === 0) {

				geometry.addDrawCall(0, indices.length);
			}

			// allocate maximal size
			var edges = new Uint32Array(2 * indices.length);

			for (var o = 0, ol = drawcalls.length; o < ol; ++o) {

				var drawcall = drawcalls[o];

				var start = drawcall.start;
				var count = drawcall.count;

				for (var i = start, il = start + count; i < il; i += 3) {

					for (var j = 0; j < 3; j++) {

						edge[0] = indices[i + j];
						edge[1] = indices[i + (j + 1) % 3];
						edge.sort(sortFunction);

						var key = edge.toString();

						if (hash[key] === undefined) {

							edges[2 * numEdges] = edge[0];
							edges[2 * numEdges + 1] = edge[1];
							hash[key] = true;
							numEdges++;
						}
					}
				}
			}

			var coords = new Float32Array(numEdges * 2 * 3);

			for (var i = 0, l = numEdges; i < l; i++) {

				for (var j = 0; j < 2; j++) {

					var index = 6 * i + 3 * j;
					var index2 = edges[2 * i + j];

					coords[index + 0] = vertices.getX(index2);
					coords[index + 1] = vertices.getY(index2);
					coords[index + 2] = vertices.getZ(index2);
				}
			}

			this.addAttribute('position', new _coreBufferAttribute.THREE$BufferAttribute(coords, 3));
		} else {

			// non-indexed BufferGeometry

			var vertices = geometry.attributes.position.array;
			var numEdges = vertices.length / 3;
			var numTris = numEdges / 3;

			var coords = new Float32Array(numEdges * 2 * 3);

			for (var i = 0, l = numTris; i < l; i++) {

				for (var j = 0; j < 3; j++) {

					var index = 18 * i + 6 * j;

					var index1 = 9 * i + 3 * j;
					coords[index + 0] = vertices[index1];
					coords[index + 1] = vertices[index1 + 1];
					coords[index + 2] = vertices[index1 + 2];

					var index2 = 9 * i + 3 * ((j + 1) % 3);
					coords[index + 3] = vertices[index2];
					coords[index + 4] = vertices[index2 + 1];
					coords[index + 5] = vertices[index2 + 2];
				}
			}

			this.addAttribute('position', new _coreBufferAttribute.THREE$BufferAttribute(coords, 3));
		}
	}
};

THREE$WireframeGeometry.prototype = Object.create(_coreBufferGeometry.THREE$BufferGeometry.prototype);
THREE$WireframeGeometry.prototype.constructor = THREE$WireframeGeometry;

exports.THREE$WireframeGeometry = THREE$WireframeGeometry;