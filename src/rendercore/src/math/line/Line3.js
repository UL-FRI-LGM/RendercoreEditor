import { Vector3 } from "../Vector3.js";


export class Line3 {


	static DEFAULT = {
		A: new Vector3(-1.0, -1.0, +0.0),
		B: new Vector3(+1.0, -1.0, +0.0),
	};


	#a = new Vector3(-1.0, -1.0, +0.0);
	#b = new Vector3(+1.0, -1.0, +0.0);


	constructor(a, b) {
		this.a = (a !== undefined) ? a : Line3.DEFAULT.A;
		this.b = (b !== undefined) ? b : Line3.DEFAULT.B;
	}


	get a() { return this.#a; }
	set a(a) { this.#a.copy(a); }
	get b() { return this.#b; }
	set b(b) { this.#b.copy(b); }


	copy(line) {
		this.a.copy(line.a);
		this.b.copy(line.b);
	}
	clone() {
		return new Line3(this.a, this.b);
	}
};
