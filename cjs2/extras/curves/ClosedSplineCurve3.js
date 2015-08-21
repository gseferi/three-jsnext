'use strict';

var Curve = require('../core/Curve');
var Vector3 = require('../../math/Vector3');

var THREE$ClosedSplineCurve3;

/**************************************************************
 *	Closed Spline 3D curve
 **************************************************************/


THREE$ClosedSplineCurve3 = Curve.THREE$Curve.create(

	function ( points /* array of Vector3 */ ) {

		this.points = ( points == undefined ) ? [] : points;

	},

	function ( t ) {

		var points = this.points;
		var point = ( points.length - 0 ) * t; // This needs to be from 0-length +1

		var intPoint = Math.floor( point );
		var weight = point - intPoint;

		intPoint += intPoint > 0 ? 0 : ( Math.floor( Math.abs( intPoint ) / points.length ) + 1 ) * points.length;

		var point0 = points[ ( intPoint - 1 ) % points.length ];
		var point1 = points[ ( intPoint     ) % points.length ];
		var point2 = points[ ( intPoint + 1 ) % points.length ];
		var point3 = points[ ( intPoint + 2 ) % points.length ];

		var vector = new Vector3.THREE$Vector3();

		vector.x = Curve.THREE$Curve.Utils.interpolate( point0.x, point1.x, point2.x, point3.x, weight );
		vector.y = Curve.THREE$Curve.Utils.interpolate( point0.y, point1.y, point2.y, point3.y, weight );
		vector.z = Curve.THREE$Curve.Utils.interpolate( point0.z, point1.z, point2.z, point3.z, weight );

		return vector;

	}

);

exports.THREE$ClosedSplineCurve3 = THREE$ClosedSplineCurve3;