import { Centroid3 } from "../Centroid3.js";
import { Vector3 } from "../Vector3.js";


export class Sphere {


	static DEFAULT = {
		CENTER: new Vector3(0, 0, 0),
		RADIUS: 0,
	};


	#center = Sphere.DEFAULT.CENTER.clone();
	#radius = Sphere.DEFAULT.RADIUS;


	constructor (center = Sphere.DEFAULT.CENTER.clone(), radius = Sphere.DEFAULT.RADIUS) {
		this.center = center;
		this.radius = radius;
	}


	get center() { return this.#center; }
	set center(center) { this.#center.copy(center); }
	get radius() { return this.#radius; }
	set radius(radius) { this.#radius = radius; }


	copy(sphere) {
		this.center.copy(sphere.center);
		this.radius = sphere.radius;


		return this;
	}
	clone() {
		return new Sphere(
			this.center.clone(),
			this.radius
		);
	}

	reset(CLASS = Sphere) {
		this.center.copy(CLASS.DEFAULT.CENTER);
		this.radius = CLASS.DEFAULT.RADIUS;
	}

	setFromArrayBuffer = (() => {
		const currPoint = new Vector3(0, 0, 0);


		return (arrayBuffer) => {
			const nPoints = arrayBuffer.length / 3;
			const centroid = new Centroid3(0, 0, 0).setFromArrayBuffer(arrayBuffer);

			this.center = centroid;	// setter copy
			this.radius = 0;		// setter copy


			for (let i = 0; i < nPoints; i++) {
				currPoint.x = arrayBuffer[i*3 + 0];
				currPoint.y = arrayBuffer[i*3 + 1];
				currPoint.z = arrayBuffer[i*3 + 2];
	
				this.radius = Math.max(this.radius, currPoint.distanceTo(centroid));
			}


			return this;
		};
	})();

	applyMatrix4(matrix4) {
		this.center.applyMatrix4(matrix4);
		this.radius = this.radius * matrix4.getMaxScaleOnAxis();


		return this;
	}

	union(sphere) {
		const d = this.center.distanceTo(sphere.center);
		const r1 = this.radius;
		const r2 = sphere.radius;

		const delta = d - r1 + r2;


		if (delta > 0) this.radius = this.radius + delta;


		return this;
	}
};
