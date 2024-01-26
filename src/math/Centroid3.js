import { Vector3 } from "./Vector3.js";


export class Centroid3 extends Vector3 {


	constructor (...rest) {
		super(...rest);
	}


	setFromArrayBuffer(arrayBuffer) {
		const nPoints = arrayBuffer.length / 3;
		this.x = 0;
		this.y = 0;
		this.z = 0;


		for (let i = 0; i < nPoints; i++) {
			this.x = this.x + arrayBuffer[i*3 + 0];
			this.y = this.y + arrayBuffer[i*3 + 1];
			this.z = this.z + arrayBuffer[i*3 + 2];
		}
		this.divideScalar(nPoints);


		return this;
	}
};
