export class Vector3F32 {


	static DEFAULT = {
		X: 0.0,
		Y: 0.0,
		Z: 0.0,
	};

	static ZERO = new Vector3F32(0.0, 0.0, 0.0);
	static ONE = new Vector3F32(1.0, 1.0, 1.0);


	#arrayBuffer = new Float32Array(3);

	#x;
	#y;
	#z;


	constructor (x, y, z, arrayBuffer = new Float32Array(3)) {
		this.arrayBuffer = arrayBuffer;

		this.x = (x !== undefined) ? x : Vector3F32.DEFAULT.X;
		this.y = (y !== undefined) ? y : Vector3F32.DEFAULT.Y;
		this.z = (z !== undefined) ? z : Vector3F32.DEFAULT.Z;
	}


	get arrayBuffer() { return this.#arrayBuffer; }
	set arrayBuffer(arrayBuffer) { this.#arrayBuffer = arrayBuffer; }

	get x() { return this.#x; }
	set x(x) {
		this.arrayBuffer[0] = x;

		this.#x = x;
	}
	get y() { return this.#y; }
	set y(y) {
		this.arrayBuffer[1] = y;

		this.#y = y;
	}
	get z() { return this.#z; }
	set z(z) {
		this.arrayBuffer[2] = z;

		this.#z = z;
	}


	copy(vector) {
		this.x = vector.x;
		this.y = vector.y;
		this.z = vector.z;
	}
	clone() {
		return new Vector3F32(this.x, this.y, this.z);
	}
	toArray() {
		return new Array(this.x, this.y, this.z);
	}

	lerp(vector, t) {
		this.x = this.x + (vector.x - this.x) * t;
		this.y = this.y + (vector.y - this.y) * t;
		this.z = this.z + (vector.z - this.z) * t;

		
		return this;
	}
};
