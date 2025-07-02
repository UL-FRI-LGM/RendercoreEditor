import { Vector3 } from "../Vector3.js";


export class Point3 {


	static DEFAULT = {
		A: new Vector3(+0.0, +0.0, +0.0),
	};


	#a = new Vector3(+0.0, +0.0, +0.0);


	constructor(a) {
		this.a = (a !== undefined) ? a : Point3.DEFAULT.A;
	}


	get a() { return this.#a; }
	set a(a) { this.#a.copy(a); }


	copy(point) {
		this.a.copy(point.a);
	}
	clone() {
		return new Point3(this.a);
	}
};
