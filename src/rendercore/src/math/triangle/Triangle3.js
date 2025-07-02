import { Vector3 } from "../Vector3.js";


export class Triangle3 {


	static DEFAULT = {
		A: new Vector3(-1.0, -1.0, +0.0),
		B: new Vector3(+1.0, -1.0, +0.0),
		C: new Vector3(+0.0, +1.0, +0.0),
	};


	#a = new Vector3(-1.0, -1.0, +0.0);
	#b = new Vector3(+1.0, -1.0, +0.0);
	#c = new Vector3(+0.0, +1.0, +0.0);


	constructor(a, b, c) {
		this.a = (a !== undefined) ? a : Triangle3.DEFAULT.A;
		this.b = (b !== undefined) ? b : Triangle3.DEFAULT.B;
		this.c = (c !== undefined) ? c : Triangle3.DEFAULT.C;
	}


	get a() { return this.#a; }
	set a(a) { this.#a.copy(a); }
	get b() { return this.#b; }
	set b(b) { this.#b.copy(b); }
	get c() { return this.#c; }
	set c(c) { this.#c.copy(c); }


	copy(triangle) {
		this.a.copy(triangle.a);
		this.b.copy(triangle.b);
		this.c.copy(triangle.c);
	}
	clone() {
		return new Triangle3(this.a, this.b, this.c);
	}

	computeNormal = (() => {
		const v1 = new Vector3();
		const v2 = new Vector3();


		return (target = new Vector3()) => {
			v1.subVectors(this.b, this.a);
			v2.subVectors(this.c, this.a);
			
			return target.set(
				v1.y*v2.z - v1.z*v2.y,
				v1.z*v2.x - v1.x*v2.z,
				v1.x*v2.y - v1.y*v2.x
			).normalize();
		};
	})();
	computeNormal$ = (() => {
		const normal = new Vector3();


		return () => {
			return this.computeNormal(normal);
		};
	})();
};
