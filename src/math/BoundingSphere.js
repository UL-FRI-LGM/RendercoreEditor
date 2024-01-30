import { Centroid3 } from "./Centroid3.js";
import { Vector3 } from "./Vector3.js";


export class BoundingSphere {


	static DEFAULT = {
		CENTER: new Vector3(0, 0, 0),
		RADIUS: 0,
	};


	#center = BoundingSphere.DEFAULT.CENTER.clone();
	#radius = BoundingSphere.DEFAULT.RADIUS;


	constructor (center = BoundingSphere.DEFAULT.CENTER.clone(), radius = BoundingSphere.DEFAULT.RADIUS) {
		this.center = center;
		this.radius = radius;
	}


	get center() { return this.#center; }
	set center(center) { this.#center.copy(center); }
	get radius() { return this.#radius; }
	set radius(radius) { this.#radius = radius; }


	copy(boundingSphere) {
		this.center.copy(boundingSphere.center);
		this.radius = boundingSphere.radius;


		return this;
	}
	clone() {
		return new BoundingSphere(
			this.center.clone(),
			this.radius
		);
	}

	reset() {
		this.center.copy(BoundingSphere.DEFAULT.CENTER);
		this.radius = BoundingSphere.DEFAULT.RADIUS;
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

	union(boundingSphere) {
		const d = this.center.distanceTo(boundingSphere.center);
		const r1 = this.radius;
		const r2 = boundingSphere.radius;

		const delta = d - r1 + r2;


		if (delta > 0) this.radius = this.radius + delta;


		return this;
	}
};
