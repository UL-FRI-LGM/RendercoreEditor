export class Origin3D {


	#x = 0;
	#y = 0;
	#z = 0;


	constructor(args = {}) {
		this.x = args.x !== undefined ? args.x : undefined;
		this.y = args.y !== undefined ? args.y : undefined;
		this.z = args.z !== undefined ? args.z : undefined;
	}


	get x() { return this.#x; }
	set x(x) { this.#x = x; }
	get y() { return this.#y; }
	set y(y) { this.#y = y; }
	get z() { return this.#z; }
	set z(z) { this.#z = z; }
};
