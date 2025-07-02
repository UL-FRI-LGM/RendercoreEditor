import { Vector3 } from "./Vector3.js";


export class Dimension {


	static DEFAULT = {
		MIN: new Vector3(-Infinity, -Infinity, -Infinity),
		MAX: new Vector3(+Infinity, +Infinity, +Infinity),
	};


	#min = Dimension.DEFAULT.MIN.clone();
	#max = Dimension.DEFAULT.MAX.clone();


	constructor (min = Dimension.DEFAULT.MIN.clone(), max = Dimension.DEFAULT.MAX.clone()) {
		this.min = min;
		this.max = max;
	}


	get min() { return this.#min; }
	set min(min) { this.min.copy(min); }
	get max() { return this.#max; }
	set max(max) { this.max.copy(max); }


	copy(dimension) {
		this.min.copy(dimension.min);
		this.max.copy(dimension.max);


		return this;
	}
	clone() {
		return new Dimension(
			this.min.clone(),
			this.max.clone()
		);
	}

	applyMatrix3(matrix3) {
		this.min.applyMatrix3(matrix3);
		this.max.applyMatrix3(matrix3);


		return this;
	}
	applyMatrix4(matrix4) {
		this.min.applyMatrix4(matrix4);
		this.max.applyMatrix4(matrix4);


		return this;
	}
};
