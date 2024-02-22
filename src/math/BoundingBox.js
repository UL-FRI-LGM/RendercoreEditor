import { Centroid3 } from "./Centroid3.js";
import { Matrix4 } from "./Matrix4.js";
import { Vector3 } from "./Vector3.js";


export class BoundingBox {


	static DEFAULT = {
		MIN: new Vector3(0, 0, 0),
		MAX: new Vector3(0, 0, 0),
	};


	#min = BoundingBox.DEFAULT.MIN.clone();
	#max = BoundingBox.DEFAULT.MAX.clone();


	constructor (min = BoundingBox.DEFAULT.MIN.clone(), max = BoundingBox.DEFAULT.MAX.clone()) {
		this.min = min;
		this.max = max;
	}


	get min() { return this.#min; }
	set min(min) { this.#min.copy(min); }
	get max() { return this.#max; }
	set max(max) { this.#max.copy(max); }


	copy(boundingBox) {
		this.min.copy(boundingBox.min);
		this.max.copy(boundingBox.max);


		return this;
	}
	clone() {
		return new BoundingBox(
			this.min.clone(),
			this.max.clone()
		);
	}

	reset() {
		this.min.copy(BoundingBox.DEFAULT.MIN);
		this.max.copy(BoundingBox.DEFAULT.MAX);
	}

	setFromArrayBuffer = (() => {
		const currPoint = new Vector3(0, 0, 0);


		return (arrayBuffer) => {
			const nPoints = arrayBuffer.length / 3;
			const centroid = new Centroid3(0, 0, 0).setFromArrayBuffer(arrayBuffer);

			this.min = centroid;	// setter copy
			this.max = centroid;	// setter copy


			for (let i = 0; i < nPoints; i++) {
				currPoint.x = arrayBuffer[i*3 + 0];
				currPoint.y = arrayBuffer[i*3 + 1];
				currPoint.z = arrayBuffer[i*3 + 2];

				this.min.min(currPoint);
				this.max.max(currPoint);
			}


			return this;
		};
	})();

	applyMatrix4 = (() => {
		const p000 = new Vector3();
		const p001 = new Vector3();
		const p010 = new Vector3();
		const p011 = new Vector3();
		const p100 = new Vector3();
		const p101 = new Vector3();
		const p110 = new Vector3();
		const p111 = new Vector3();

		const points = new Float32Array(8 * 3);


		return (matrix4) => {
			p000.set(this.min.x, this.min.y, this.min.z).applyMatrix4(matrix4).toArray(points,  0);
			p001.set(this.min.x, this.min.y, this.max.z).applyMatrix4(matrix4).toArray(points,  3);
			p010.set(this.min.x, this.max.y, this.min.z).applyMatrix4(matrix4).toArray(points,  6);
			p011.set(this.min.x, this.max.y, this.max.z).applyMatrix4(matrix4).toArray(points,  9);
			p100.set(this.max.x, this.min.y, this.min.z).applyMatrix4(matrix4).toArray(points, 12);
			p101.set(this.max.x, this.min.y, this.max.z).applyMatrix4(matrix4).toArray(points, 15);
			p110.set(this.max.x, this.max.y, this.min.z).applyMatrix4(matrix4).toArray(points, 18);
			p111.set(this.max.x, this.max.y, this.max.z).applyMatrix4(matrix4).toArray(points, 21);

			this.setFromArrayBuffer(points);
	
	
			return this;
		};
	})();

	union(boundingBox) {
		this.min.min(boundingBox.min);
		this.max.max(boundingBox.max);


		return this;
	}

	intersectsBoundingBox(boundingBox) {
		return (
			this.min.x < boundingBox.max.x && this.max.x > boundingBox.min.x &&
			this.min.y < boundingBox.max.y && this.max.y > boundingBox.min.y &&
			this.min.z < boundingBox.max.z && this.max.z > boundingBox.min.z
		);
	}
};
