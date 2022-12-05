export class Color3 {
	static DEFAULT = {
		R: 0.0,
		G: 0.0,
		B: 0.0,
	};


	#arrayBuffer = new Float32Array(3);

	#r;
	#g;
	#b;


	constructor (r, g, b, arrayBuffer = new Float32Array(3)) {
		this.arrayBuffer = arrayBuffer;
		this.r = (r !== undefined) ? r : Color3.DEFAULT.R;
		this.g = (g !== undefined) ? g : Color3.DEFAULT.G;
		this.b = (b !== undefined) ? b : Color3.DEFAULT.B;
	}


	get arrayBuffer() { return this.#arrayBuffer; }
	set arrayBuffer(arrayBuffer) { this.#arrayBuffer = arrayBuffer; }

	get r() { return this.#r; }
	set r(r) { 
		this.arrayBuffer[0] = r;
		this.#r = r; 
	}
	get g() { return this.#g; }
	set g(g) { 
		this.arrayBuffer[1] = g;
		this.#g = g; 
	}
	get b() { return this.#b; }
	set b(b) {
		this.arrayBuffer[2] = b; 
		this.#b = b; 
	}


	copy(color) {
		this.r = color.r;
		this.g = color.g;
		this.b = color.b;
	}
	clone() {
		return new Color3(this.r, this.g, this.b);
	}
	toArray() {
		return new Array(this.r, this.g, this.b);
	}
};